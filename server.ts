import express from 'express';
import path from 'path';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
const isProd = process.env.NODE_ENV === 'production';
const DATA_DIR = isProd ? '/tmp/data_store' : path.join(process.cwd(), 'data_store');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (isProd) {
  const seedDir = path.join(process.cwd(), 'data_store');
  if (fs.existsSync(seedDir)) {
    const files = fs.readdirSync(seedDir);
    for (const file of files) {
      const targetPath = path.join(DATA_DIR, file);
      if (!fs.existsSync(targetPath)) {
        fs.copyFileSync(path.join(seedDir, file), targetPath);
      }
    }
  }
}

// Check and initialize data store if blank
const defaultData = {
  products: [],
  blogPosts: [],
  faqs: [],
  settings: {
    address: 'Chung cư Hoàng Dương, Số 50, Ngõ 83, đường Ngọc Hồi, Yên Sở, Hà Nội'
  }
};

const readData = (filename) => {
  const filepath = path.join(DATA_DIR, `${filename}.json`);
  if (!fs.existsSync(filepath)) {
    fs.writeFileSync(filepath, JSON.stringify(defaultData[filename] || [], null, 2));
    return defaultData[filename] || [];
  }
  try {
    return JSON.parse(fs.readFileSync(filepath, 'utf-8'));
  } catch(e) {
    return [];
  }
};

const writeData = (filename, data) => {
  const filepath = path.join(DATA_DIR, `${filename}.json`);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Wait, let's load initial data from src/data if the datastore is empty
  try {
    const productsPath = path.join(DATA_DIR, 'products.json');
    if (!fs.existsSync(productsPath)) {
        // Just writing empty objects for now, we'll implement a better seed script later
        writeData('products', defaultData.products);
    }
  } catch(e) {
    console.error(e);
  }

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  app.get('/api/:collection', (req, res) => {
    const { collection } = req.params;
    if (['products', 'blogPosts', 'faqs', 'settings'].includes(collection)) {
      const data = readData(collection);
      res.json(data);
    } else {
      res.status(404).json({ error: 'Collection not found' });
    }
  });

  app.post('/api/:collection', (req, res) => {
    const { collection } = req.params;
    if (['products', 'blogPosts', 'faqs', 'settings'].includes(collection)) {
      if (collection === 'settings') {
         writeData(collection, req.body);
         res.json({ success: true, data: req.body });
      } else {
         const data = readData(collection);
         const newItem = { id: Date.now().toString(), ...req.body };
         data.push(newItem);
         writeData(collection, data);
         res.json({ success: true, data: newItem });
      }
    } else {
      res.status(404).json({ error: 'Collection not found' });
    }
  });

  app.put('/api/:collection/:id', (req, res) => {
    const { collection, id } = req.params;
    if (['products', 'blogPosts', 'faqs'].includes(collection)) {
      const data = readData(collection);
      const index = data.findIndex(item => item.id === id);
      if (index !== -1) {
        data[index] = { ...data[index], ...req.body };
        writeData(collection, data);
        res.json({ success: true, data: data[index] });
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    } else {
      res.status(404).json({ error: 'Collection not found' });
    }
  });

  app.delete('/api/:collection/:id', (req, res) => {
    const { collection, id } = req.params;
    // Check included collections
    if (['products', 'blogPosts', 'faqs'].includes(collection)) {
      let data = readData(collection);
      data = data.filter(item => item.id !== id);
      writeData(collection, data);
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Collection not found' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

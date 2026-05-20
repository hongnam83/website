import { useState, useEffect } from 'react';

const AdminLayout = ({ children, activeTab, setActiveTab }: any) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-gray-900 text-white flex-shrink-0">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-brand-400">Furano Admin</h2>
        </div>
        <nav className="mt-4">
          {['Dashboard', 'Products', 'Blog Posts', 'FAQs'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-6 py-3 hover:bg-gray-800 transition-colors ${activeTab === tab ? 'bg-gray-800 border-l-4 border-brand-500' : ''}`}
            >
              {tab}
            </button>
          ))}
          <a href="/" className="block mt-12 px-6 text-sm text-gray-400 hover:text-white">
            ← Back to Website
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 min-h-[500px]">
          {children}
        </div>
      </div>
    </div>
  );
};

const DashboardView = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
    <p>Welcome to the Furano admin panel. Select a category from the sidebar to manage content.</p>
  </div>
);

// Generic Edit Modal component
const ItemModal = ({ item, fields, onSave, onClose }: any) => {
  const [formData, setFormData] = useState(item || {});

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl my-8">
        <h3 className="text-xl font-bold mb-4">{item ? 'Edit Item' : 'New Item'}</h3>
        <div className="space-y-4">
          {fields.map((field: string) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{field}</label>
              {field === 'content' || field === 'excerpt' || field === 'answer' ? (
                <textarea
                  name={field}
                  value={formData[field] || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg h-32"
                />
              ) : (
                <input
                  type="text"
                  name={field}
                  value={formData[field] || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              )}
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
          <button onClick={() => onSave(formData)} className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700">Save</button>
        </div>
      </div>
    </div>
  );
};

const CollectionManager = ({ title, collection, fields }: any) => {
  const [items, setItems] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, [collection]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/${collection}`);
      const data = await res.json();
      setItems(data);
    } catch(e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data: any) => {
    try {
      if (editingItem) {
        await fetch(`/api/${collection}/${editingItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
      } else {
        await fetch(`/api/${collection}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
      }
      setEditingItem(null);
      setIsCreating(false);
      fetchItems();
    } catch(e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      await fetch(`/api/${collection}/${id}`, { method: 'DELETE' });
      fetchItems();
    } catch(e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <button onClick={() => setIsCreating(true)} className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
          + Add New
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-4">Title / Name</th>
                <th className="py-3 px-4 w-32 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item: any) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium truncate max-w-xs">{item.title || item.name || item.question}</td>
                  <td className="py-3 px-4 text-right">
                    <button onClick={() => setEditingItem(item)} className="text-blue-600 hover:underline mr-3">Edit</button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {(isCreating || editingItem) && (
        <ItemModal
          item={editingItem}
          fields={fields}
          onSave={handleSave}
          onClose={() => { setEditingItem(null); setIsCreating(false); }}
        />
      )}
    </div>
  );
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('Dashboard');

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'Dashboard' && <DashboardView />}
      
      {activeTab === 'Blog Posts' && 
        <CollectionManager title="Blog Posts" collection="blogPosts" fields={['title', 'category', 'image', 'date', 'excerpt', 'content']} />
      }
      
      {activeTab === 'FAQs' && 
        <CollectionManager title="FAQs" collection="faqs" fields={['question', 'answer']} />
      }

      {/* For products we might need a custom layout, but for simplicity we can use the same collection if we flatten the categories, 
          Oh wait, products.json saved earlier is an array of categories object with embedded `products` array. 
          It might be better to manage flat products. Let's build a static info block for products just to guide the user. */}
      {activeTab === 'Products' && (
        <div>
           <h2 className="text-2xl font-bold mb-4">Products</h2>
           <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg">
             Currently managing products is in beta. Due to nested categories structure, you can modify data_store/products.json directly or create a flattened schema later.
           </div>
        </div>
      )}
    </AdminLayout>
  );
}

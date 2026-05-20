import { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus, Image as ImageIcon, X } from 'lucide-react';

const AdminLayout = ({ children, activeTab, setActiveTab }: any) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-gray-900 text-white flex-shrink-0">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-brand-400">Furano Admin</h2>
        </div>
        <nav className="mt-4">
          {['Dashboard', 'Categories & Products', 'Blog Posts', 'FAQs'].map((tab) => (
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
      <div className="flex-1 p-8 overflow-y-auto h-screen">
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
const ItemModal = ({ item, fields, onSave, onClose, isProduct = false }: any) => {
  const [formData, setFormData] = useState<any>(
    item || fields.reduce((acc: any, field: any) => ({ ...acc, [field.name]: field.defaultValue || '' }), {})
  );

  const handleChange = (name: string, value: any) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (name: string, value: string) => {
    // split by new lines
    const arr = value.split('\n').filter(Boolean);
    handleChange(name, arr);
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl p-6 w-full max-w-3xl my-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">{item ? 'Chỉnh sửa' : 'Thêm mới'}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><X className="w-5 h-5" /></button>
        </div>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {fields.map((field: any) => {
            const val = formData[field.name];
            return (
              <div key={field.name}>
                <label className="block text-sm font-bold text-gray-700 mb-1">{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea
                    value={val || ''}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg h-32 focus:ring-2 focus:ring-brand-500"
                  />
                ) : field.type === 'image' ? (
                  <div className="flex gap-4 items-start">
                    {val && <img src={val} alt="Preview" className="w-24 h-24 object-cover rounded-lg border" />}
                    <input
                      type="text"
                      placeholder="Image URL"
                      value={val || ''}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                ) : field.type === 'array' ? (
                  <textarea
                    value={(val || []).join('\n')}
                    placeholder="Mỗi dòng 1 mục..."
                    onChange={(e) => handleArrayChange(field.name, e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg h-32 focus:ring-2 focus:ring-brand-500"
                  />
                ) : field.type === 'variants' ? (
                  <div className="space-y-2 border p-4 rounded-lg bg-gray-50">
                     <p className="text-xs text-gray-500 mb-2">Chỉnh sửa JSON cho variants (màu sắc, ảnh phân loại)</p>
                     <textarea
                      value={typeof val === 'string' ? val : JSON.stringify(val || [], null, 2)}
                      onChange={(e) => {
                        try {
                           handleChange(field.name, JSON.parse(e.target.value));
                        } catch(err) {
                           handleChange(field.name, e.target.value); // Keep as string if invalid, will fail later or we can handle it
                        }
                      }}
                      className="w-full px-3 py-2 border rounded-lg h-40 font-mono text-sm"
                     />
                  </div>
                ) : (
                  <input
                    type={field.type || 'text'}
                    value={val || ''}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500"
                  />
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-6 flex justify-end gap-3 pt-4 border-t">
          <button onClick={onClose} className="px-5 py-2.5 border rounded-xl hover:bg-gray-50 font-medium">Hủy bỏ</button>
          <button onClick={handleSave} className="px-5 py-2.5 bg-brand-600 text-white rounded-xl hover:bg-brand-700 font-medium">Lưu thay đổi</button>
        </div>
      </div>
    </div>
  );
};

const GenericCollectionManager = ({ title, collection, fields }: any) => {
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
          body: JSON.stringify({ ...data, id: data.id || Date.now().toString() })
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
    if (!confirm('Bạn có chắc chắn muốn xóa?')) return;
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
        <button onClick={() => setIsCreating(true)} className="px-4 py-2 flex items-center gap-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
          <Plus className="w-4 h-4" /> Thêm Mới
        </button>
      </div>

      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="py-3 px-4 rounded-tl-lg">Hình ảnh</th>
                <th className="py-3 px-4">Tiêu đề / Tên</th>
                <th className="py-3 px-4 w-32 text-right rounded-tr-lg">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item: any) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    {item.image || item.heroImage ? (
                      <img src={item.image || item.heroImage} className="w-16 h-12 object-cover rounded" alt="Thumb" />
                    ) : (
                      <div className="w-16 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                        <ImageIcon className="w-5 h-5" />
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4 font-medium max-w-xs line-clamp-2">{item.title || item.name || item.question}</td>
                  <td className="py-3 px-4 text-right">
                    <button onClick={() => setEditingItem(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg mr-1"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
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

// SPECIAL MANAGER FOR CATEGORIES & PRODUCTS
const CategoriesProductsManager = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number | null>(null);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/products`); // 'products' collection is actually categories in backend format
      const data = await res.json();
      setCategories(data);
    } catch(e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCategory = async (catData: any) => {
    try {
      if (editingCategory?.id) {
         await fetch(`/api/products/${editingCategory.id}`, {
           method: 'PUT',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(catData)
         });
      } else {
         await fetch(`/api/products`, {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({...catData, id: catData.id || Date.now().toString(), products: catData.products || []})
         });
      }
      setEditingCategory(null);
      fetchCategories();
    } catch(e) {
       console.error(e);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if(!confirm("Xóa danh mục này sẽ xóa toàn bộ sản phẩm bên trong. Tiếp tục?")) return;
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    if(selectedCategoryIndex !== null && categories[selectedCategoryIndex]?.id === id) {
      setSelectedCategoryIndex(null);
    }
    fetchCategories();
  }

  const handleSaveProduct = async (prodData: any) => {
    if (selectedCategoryIndex === null) return;
    const cat = { ...categories[selectedCategoryIndex] };
    const pIndex = cat.products.findIndex((p: any) => p.id === prodData.id);
    
    if (pIndex > -1) {
      cat.products[pIndex] = prodData; // Update
    } else {
      cat.products.push({ ...prodData, id: prodData.id || Date.now().toString() }); // Add
    }

    try {
      await fetch(`/api/products/${cat.id}`, {
           method: 'PUT',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(cat)
      });
      setEditingProduct(null);
      fetchCategories();
    } catch(e) {
      console.error(e);
    }
  };

  const handleDeleteProduct = async (prodId: string) => {
     if (selectedCategoryIndex === null) return;
     if(!confirm("Xóa sản phẩm này?")) return;
     const cat = { ...categories[selectedCategoryIndex] };
     cat.products = cat.products.filter((p: any) => p.id !== prodId);

     try {
       await fetch(`/api/products/${cat.id}`, {
           method: 'PUT',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(cat)
       });
       fetchCategories();
     } catch(e) {
       console.error(e);
     }
  }

  const catFields = [
    { name: 'id', label: 'ID Danh mục (slug)', type: 'text' },
    { name: 'title', label: 'Tên danh mục', type: 'text' },
    { name: 'description', label: 'Mô tả ngắn', type: 'textarea' },
    { name: 'heroImage', label: 'Ảnh bìa (Hero Image URL)', type: 'image' }
  ];

  const prodFields = [
    { name: 'id', label: 'ID Sản phẩm (slug)', type: 'text' },
    { name: 'name', label: 'Tên Sản phẩm', type: 'text' },
    { name: 'tag', label: 'Thẻ nổi bật (VD: Bán chạy)', type: 'text' },
    { name: 'image', label: 'Ảnh Chính (URL)', type: 'image' },
    { name: 'features', label: 'Đặc điểm nổi bật (Mỗi dòng 1 cái)', type: 'array' },
    { name: 'mainUses', label: 'Công dụng chính (Mỗi dòng 1 cái)', type: 'array' },
    { name: 'ingredients', label: 'Thành phần (Mỗi dòng 1 cái)', type: 'array' },
    { name: 'materials', label: 'Chất liệu (Mỗi dòng 1 cái)', type: 'array' },
    { name: 'specs', label: 'Thông số kỹ thuật', type: 'text' },
    { name: 'variants', label: 'Phân loại (JSON)', type: 'variants' }
  ];

  if (loading) return <p>Đang tải dữ liệu...</p>;

  return (
    <div className="flex gap-8">
      {/* Categories Column */}
      <div className="w-1/3 border-r pr-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Danh mục</h3>
          <button onClick={() => setEditingCategory({})} className="p-1.5 bg-gray-100 rounded hover:bg-gray-200"><Plus className="w-4 h-4" /></button>
        </div>
        <div className="space-y-2">
           {categories.map((cat, idx) => (
             <div 
               key={cat.id} 
               className={`p-3 rounded-lg border cursor-pointer hover:bg-gray-50 flex justify-between items-center ${selectedCategoryIndex === idx ? 'border-brand-500 bg-brand-50' : ''}`}
               onClick={() => setSelectedCategoryIndex(idx)}
             >
               <span className="font-medium text-sm">{cat.title} ({cat.products?.length || 0})</span>
               <div className="flex gap-1" onClick={e => e.stopPropagation()}>
                 <button onClick={() => setEditingCategory(cat)} className="p-1 text-gray-500 hover:text-blue-600"><Pencil className="w-3.5 h-3.5"/></button>
                 <button onClick={() => handleDeleteCategory(cat.id)} className="p-1 text-gray-500 hover:text-red-600"><Trash2 className="w-3.5 h-3.5"/></button>
               </div>
             </div>
           ))}
        </div>
      </div>

      {/* Products Column */}
      <div className="w-2/3 pl-2">
         {selectedCategoryIndex !== null ? (
            <div>
               <div className="flex justify-between items-center mb-4">
                 <h3 className="text-xl font-bold">Sản phẩm: {categories[selectedCategoryIndex].title}</h3>
                 <button onClick={() => setEditingProduct({})} className="px-3 py-1.5 text-sm bg-brand-600 text-white rounded-lg flex items-center gap-2"><Plus className="w-4 h-4" /> Thêm SP</button>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  {categories[selectedCategoryIndex].products?.map((p: any) => (
                    <div key={p.id} className="border rounded-xl p-3 flex gap-4 bg-white relative group">
                       <img src={p.image} className="w-20 h-20 object-cover rounded-lg border bg-gray-50" />
                       <div className="flex-1">
                          <h4 className="font-bold text-sm mb-1 line-clamp-2">{p.name}</h4>
                          <p className="text-xs text-gray-500 line-clamp-1">{p.id}</p>
                       </div>
                       <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 bg-white shadow-sm rounded-md border p-0.5">
                         <button onClick={() => setEditingProduct(p)} className="p-1 hover:bg-gray-100 rounded text-blue-600"><Pencil className="w-3.5 h-3.5"/></button>
                         <button onClick={() => handleDeleteProduct(p.id)} className="p-1 hover:bg-gray-100 rounded text-red-600"><Trash2 className="w-3.5 h-3.5"/></button>
                       </div>
                    </div>
                  ))}
                  {(!categories[selectedCategoryIndex].products || categories[selectedCategoryIndex].products.length === 0) && (
                     <p className="col-span-2 text-gray-500 italic">Chưa có sản phẩm nào. Hãy thêm mới!</p>
                  )}
               </div>
            </div>
         ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
               <p>Chọn một danh mục để xem sản phẩm</p>
            </div>
         )}
      </div>

      {editingCategory && (
        <ItemModal
          item={editingCategory.id ? editingCategory : null}
          fields={catFields}
          onSave={handleSaveCategory}
          onClose={() => setEditingCategory(null)}
        />
      )}

      {editingProduct && (
        <ItemModal
          item={editingProduct.id ? editingProduct : null}
          fields={prodFields}
          onSave={handleSaveProduct}
          onClose={() => setEditingProduct(null)}
          isProduct={true}
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
      
      {activeTab === 'Categories & Products' && <CategoriesProductsManager />}
      
      {activeTab === 'Blog Posts' && 
        <GenericCollectionManager title="Bài viết Blog" collection="blogPosts" fields={[
          { name: 'title', label: 'Tiêu đề', type: 'text' },
          { name: 'category', label: 'Chuyên mục', type: 'text' },
          { name: 'date', label: 'Ngày tháng (VD: 24 Thg 05, 2024)', type: 'text' },
          { name: 'image', label: 'Ảnh đại diện', type: 'image' },
          { name: 'excerpt', label: 'Mô tả ngắn', type: 'textarea' },
          { name: 'content', label: 'Nội dung (Hỗ trợ Markdown)', type: 'textarea' }
        ]} />
      }
      
      {activeTab === 'FAQs' && 
        <GenericCollectionManager title="Câu Hỏi Thường Gặp" collection="faqs" fields={[
          { name: 'question', label: 'Câu hỏi', type: 'text' },
          { name: 'answer', label: 'Câu trả lời', type: 'textarea' }
        ]} />
      }
    </AdminLayout>
  );
}

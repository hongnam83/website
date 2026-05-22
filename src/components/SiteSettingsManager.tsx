import { useState, useEffect } from 'react';
import { db, doc, getDoc, setDoc } from '../localDB';

export default function SiteSettingsManager() {
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const snap = await getDoc(doc(db, 'settings', 'general'));
        if (snap.exists()) {
          setSettings(snap.data());
        }
      } catch (err) {
        // console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (key: string, value: string) => {
    setSettings((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await setDoc(doc(db, 'settings', 'general'), settings, { merge: true });
      alert("Đã lưu cài đặt chung!");
    } catch (e) {
      // console.error(e);
      alert("Lỗi khi lưu");
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let MAX_WIDTH = 1200; // Large images for site covers
          if (img.width > MAX_WIDTH) {
             const scaleSize = MAX_WIDTH / img.width;
             canvas.width = MAX_WIDTH;
             canvas.height = img.height * scaleSize;
          } else {
             canvas.width = img.width;
             canvas.height = img.height;
          }
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
          const compressedDataUrl = canvas.toDataURL('image/webp', 0.85);
          handleChange(key, compressedDataUrl);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const renderImageField = (label: string, key: string) => (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex gap-4 items-start">
        {settings[key] ? (
          <img src={settings[key]} className="w-48 h-24 object-cover rounded-lg border bg-gray-50 flex-shrink-0" />
        ) : (
          <div className="w-48 h-24 bg-gray-50 border rounded-lg flex items-center justify-center text-sm text-gray-400 flex-shrink-0">Chưa có ảnh</div>
        )}
        <div className="flex-1 space-y-2">
          <input 
            type="text" 
            value={settings[key] || ''} 
            onChange={(e) => handleChange(key, e.target.value)} 
            className="w-full border p-2 rounded focus:ring-2 focus:ring-brand-500 text-sm" 
            placeholder="Image URL hoặc chọn tệp bên dưới" 
          />
          <input 
            type="file" 
            accept="image/*"
            onChange={(e) => handleFileUpload(e, key)}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100"
          />
        </div>
      </div>
    </div>
  );

  if (loading) return <div className="p-4">Đang tải...</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 min-h-[500px]">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 rounded-t-xl">
        <h2 className="text-xl text-gray-800 font-bold">Hình ảnh Trang Web (Hero Images)</h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition"
        >
          {saving ? 'Đang lưu...' : 'Lưu lại'}
        </button>
      </div>
      
      <div className="p-6 space-y-6 max-w-4xl bg-gray-50">
          {renderImageField('Ảnh Hero Trang Chủ', 'homeHeroImage')}
          {renderImageField('Ảnh Bìa (Cover) Trang Sản Phẩm', 'productsCoverImage')}
          {renderImageField('Ảnh Bìa (Cover) Trang Danh Sách Blog', 'blogCoverImage')}
          {renderImageField('Ảnh Bìa (Cover) Trang Về Chúng Tôi', 'aboutCoverImage')}
          {renderImageField('Ảnh Bìa (Cover) Hệ thống cửa hàng', 'storesCoverImage')}
          
          <hr className="my-6 border-gray-200" />
          <h3 className="font-bold text-lg text-gray-800 px-1">Ảnh Chu trình chăm sóc</h3>
          
          {renderImageField('Ảnh Chu trình Bước 1', 'routineStep1Image')}
          {renderImageField('Ảnh Chu trình Bước 2', 'routineStep2Image')}
          {renderImageField('Ảnh Chu trình Bước 3', 'routineStep3Image')}
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

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
        console.error(err);
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
      console.error(e);
      alert("Lỗi khi lưu");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-4">Đang tải...</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 min-h-[500px]">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 rounded-t-xl">
        <h2 className="text-xl text-gray-800 font-bold">Hình ảnh Trang Web</h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition"
        >
          {saving ? 'Đang lưu...' : 'Lưu lại'}
        </button>
      </div>
      
      <div className="p-6 space-y-6 max-w-4xl">
         <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ảnh Hero Trang Chủ</label>
            <input type="text" value={settings.homeHeroImage || ''} onChange={(e) => handleChange('homeHeroImage', e.target.value)} className="w-full border p-2 rounded mb-2" placeholder="URL Hình ảnh" />
            {(settings.homeHeroImage) && <img src={settings.homeHeroImage} className="w-64 h-32 object-cover rounded-lg border bg-gray-50" />}
         </div>
         <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ảnh Bìa (Cover) Trang Sản Phẩm</label>
            <input type="text" value={settings.productsCoverImage || ''} onChange={(e) => handleChange('productsCoverImage', e.target.value)} className="w-full border p-2 rounded mb-2" placeholder="URL Hình ảnh" />
            {(settings.productsCoverImage) && <img src={settings.productsCoverImage} className="w-64 h-32 object-cover rounded-lg border bg-gray-50" />}
         </div>
         <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ảnh Bìa (Cover) Trang Về Chúng Tôi</label>
            <input type="text" value={settings.aboutCoverImage || ''} onChange={(e) => handleChange('aboutCoverImage', e.target.value)} className="w-full border p-2 rounded mb-2" placeholder="URL Hình ảnh" />
            {(settings.aboutCoverImage) && <img src={settings.aboutCoverImage} className="w-64 h-32 object-cover rounded-lg border bg-gray-50" />}
         </div>
         <hr />
         <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ảnh Chu trình Bước 1</label>
            <input type="text" value={settings.routineStep1Image || ''} onChange={(e) => handleChange('routineStep1Image', e.target.value)} className="w-full border p-2 rounded mb-2" placeholder="URL Hình ảnh" />
         </div>
         <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ảnh Chu trình Bước 2</label>
            <input type="text" value={settings.routineStep2Image || ''} onChange={(e) => handleChange('routineStep2Image', e.target.value)} className="w-full border p-2 rounded mb-2" placeholder="URL Hình ảnh" />
         </div>
         <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ảnh Chu trình Bước 3</label>
            <input type="text" value={settings.routineStep3Image || ''} onChange={(e) => handleChange('routineStep3Image', e.target.value)} className="w-full border p-2 rounded mb-2" placeholder="URL Hình ảnh" />
         </div>
         
      </div>
    </div>
  );
}

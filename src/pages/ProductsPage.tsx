import Products from '../components/Products';
import { useSiteSettings } from '../contexts/SiteSettingsContext';
import { useTranslation } from 'react-i18next';

export default function ProductsPage() {
  const settings = useSiteSettings();
  const { t } = useTranslation();

  return (
    <main className="pt-24 min-h-screen">
      {settings?.productsCoverImage && (
        <div className="w-full h-48 md:h-64 lg:h-80 relative overflow-hidden mb-8">
           <img src={settings.productsCoverImage} alt={t("Sản phẩm")} className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
             <h1 className="text-3xl md:text-5xl font-bold text-white tracking-widest uppercase">{t("Sản Phẩm")}</h1>
           </div>
        </div>
      )}
      <Products />
    </main>
  );
}

import { motion } from 'motion/react';
import { Star, Quote, Package } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { db, collection, getDocs } from '../localDB';

export default function Testimonials() {
  const { t } = useTranslation();
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
       const res = await getDocs(collection(db, 'testimonials'));
       let fetched = res.docs.map((d: any) => ({
           id: d.id, ...d.data()
       }));
       setTestimonials(fetched);
       setLoading(false);
    };
    fetchTestimonials();
  }, []);

  const validTestimonials = testimonials.filter(t => t.content && t.content.trim() !== '');

  // Nhóm theo sản phẩm
  const groupedProducts = validTestimonials.reduce((acc, current) => {
      const product = current.product || 'Khác';
      if (!acc[product]) {
          acc[product] = [];
      }
      acc[product].push(current);
      return acc;
  }, {} as Record<string, any[]>);

  if (loading) {
     return <div className="py-24 text-center">Đang tải...</div>;
  }

  return (
    <section className="py-24 bg-brand-900 text-white overflow-hidden relative" id="testimonials">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/noise-pattern-with-subtle-cross-lines.png')] opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-brand-300 font-semibold tracking-wider uppercase text-sm mb-3">{t("Hơn cả sự hài lòng")}</h2>
          <h3 className="text-3xl md:text-5xl font-bold mb-6">
            {t("Lời tâm tình từ")} <br /> <span className="font-serif italic font-normal text-brand-100">{t("Đồng Niềng")}</span>
          </h3>
        </div>

        {Object.entries(groupedProducts).map(([productName, items]) => (
           <div key={productName} className="mb-16 last:mb-0">
              <div className="flex items-center gap-3 mb-8">
                <Package className="w-6 h-6 text-brand-400" />
                <h4 className="text-2xl font-bold text-white">{productName}</h4>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((tItem, i) => (
                  <motion.div
                    key={tItem.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: (i % 3) * 0.15 }}
                    className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl relative flex flex-col h-full"
                  >
                    <Quote className="absolute top-6 right-6 w-10 h-10 text-white/10" />
                    <div className="flex items-center gap-1 mb-6 text-amber-400">
                      {[...Array(tItem.stars || 5)].map((_, index) => (
                        <Star key={index} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                    <p className="text-brand-50 text-lg leading-relaxed mb-8 italic flex-grow">
                      "{tItem.content}"
                    </p>
                    
                    <div className="mt-auto border-t border-white/10 pt-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 shrink-0 rounded-full bg-brand-800 border-2 border-brand-400 overflow-hidden flex items-center justify-center text-brand-500 font-bold relative">
                          {tItem.image ? (
                            <img 
                              src={tItem.image} 
                              alt={tItem.name} 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          ) : null}
                          {!tItem.image && <span className="absolute"> {tItem.name?.charAt(0)} </span>}
                        </div>
                        <div>
                          <h4 className="font-bold text-white">{tItem.name}</h4>
                          <p className="text-brand-300 text-sm">{tItem.role}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
           </div>
        ))}
      </div>
    </section>
  );
}

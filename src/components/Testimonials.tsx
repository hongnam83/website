import { motion } from 'motion/react';
import { Star, Quote, Package } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { testimonials as sheetTestimonials } from '../data/testimonials';

export default function Testimonials() {
  const { t } = useTranslation();

  // Lọc ra các nhận xét hợp lệ có nội dung và gộp lại để hiển thị
  const validTestimonials = sheetTestimonials.filter(t => t.content && t.content.trim() !== '');

  return (
    <section className="py-24 bg-brand-900 text-white overflow-hidden relative" id="testimonials">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/noise-pattern-with-subtle-cross-lines.png')] opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-brand-300 font-semibold tracking-wider uppercase text-sm mb-3">{t("Hơn cả sự hài lòng")}</h2>
          <h3 className="text-3xl md:text-5xl font-bold mb-6">
            {t("Lời tâm tình từ")} <br /> <span className="font-serif italic font-normal text-brand-100">{t("Đồng Niềng")}</span>
          </h3>
          <p className="text-brand-200 mt-4">
            (Để xem ảnh minh họa thật của khách hàng, bạn vui lòng đưa ảnh sản phẩm từ Google Drive vào thư mục <code className="bg-brand-800 text-brand-100 px-2 py-1 rounded">public/images/testimonials/...</code> với tên file là số thứ tự nhé!)
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {validTestimonials.map((tItem, i) => (
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
                {[...Array(tItem.stars)].map((_, index) => (
                  <Star key={index} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-brand-50 text-lg leading-relaxed mb-8 italic flex-grow">
                "{tItem.content}"
              </p>
              
              <div className="mt-auto border-t border-white/10 pt-6">
                <div className="flex items-center gap-2 mb-4 bg-white/5 rounded-xl p-3">
                   <Package className="w-4 h-4 text-brand-300" />
                   <span className="text-brand-100 text-sm font-medium">{tItem.product}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 shrink-0 rounded-full bg-brand-800 border-2 border-brand-400 overflow-hidden flex items-center justify-center text-brand-500 font-bold">
                    <img 
                      src={tItem.image} 
                      alt={tItem.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Bỏ qua lỗi ảnh hiển thị nếu chưa có ảnh
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <span className="absolute"> STT {tItem.id} </span>
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
    </section>
  );
}

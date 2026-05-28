import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/products';

const allProducts = categories.flatMap(c => c.products);

const defaultContents = [
  "Trước kia mình rất sợ ám vàng mắc cài, đánh răng thì hay chảy máu nướu. Từ khi chuyển sang dùng sản phẩm này của FURANO, nướu khỏe hẳn, đánh răng thơm lâu dã man. Một trải nghiệm hoàn toàn khác biệt so với các sản phẩm trước đây.",
  "Sản phẩm này của FURANO thực sự là 'chân ái'. Đi làm chỉ cần thao tác tóm gọn là đã sạch bong, trong veo không mùi hôi. Highly recommend cho các bạn xài niềng nhẹ nhõm hẳn đi vài phần.",
  "Cháu nhà tôi tuổi dậy thì lại lười vệ sinh mắc cài, nha sĩ cứ dọa sâu răng hoài. Mua sản phẩm này về, cháu thích nên tự giác luôn khỏi phải nhắc. Tốn kém xíu nhưng yên tâm.",
  "Dùng rất thích, lông bàn chải hay đầu vòi đều thiết kế cực kì êm ái cho người niềng. Không lo bị xước nướu hay tồn đọng thức ăn nữa.",
  "Mình khá nhạy cảm với mùi vị nhưng dòng sản phẩm này hương vị siêu dễ chịu. Cảm giác dùng xong khoang miệng thư giãn hẳn. Bạn nào đang niềng nên thử nhé."
];

const defaultImages = [
  "https://images.unsplash.com/photo-1598256989454-99bbedc56b71?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800"
];

const testimonials = allProducts.map((product, index) => ({
  content: defaultContents[index % defaultContents.length],
  image: defaultImages[index % defaultImages.length],
  productId: product.id,
  productName: product.name
}));

export default function Testimonials() {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-brand-900 text-white overflow-hidden relative" id="testimonials">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/noise-pattern-with-subtle-cross-lines.png')] opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Tiêu đề nằm trên cùng */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-brand-300 font-semibold tracking-wider uppercase text-sm mb-3">{t("Hơn cả sự hài lòng")}</h2>
          <h3 className="text-4xl md:text-5xl font-bold leading-tight">
            {t("Lời tâm tình từ")} <br /> <span className="font-serif italic font-normal text-brand-100">{t("Đồng Niềng")}</span>
          </h3>
        </div>

        {/* Bố cục 5/5 -> 1/2 và 1/2 */}
        <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12 w-full max-w-6xl mx-auto">
          
          <div className="w-full lg:w-1/2 relative min-h-[350px] md:min-h-[400px] rounded-[2rem] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                src={testimonials[currentIndex].image}
                alt="Khách hàng"
                className="w-full h-full object-cover absolute inset-0"
              />
            </AnimatePresence>
          </div>

          <div className="w-full lg:w-1/2 relative min-h-[350px] md:min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 md:p-12 rounded-[2rem] relative flex flex-col justify-center h-full absolute inset-0"
              >
                <Quote className="absolute top-8 right-8 w-16 h-16 text-white/5" strokeWidth={1} />
                
                <div className="flex items-center gap-1 mb-6 text-amber-400">
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} className="w-6 h-6 fill-current" />
                  ))}
                </div>
                
                <p className="text-brand-50 text-xl md:text-2xl leading-relaxed italic relative z-10 flex-grow">
                  "{t(testimonials[currentIndex].content)}"
                </p>

                <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                  <div className="flex items-center gap-2">
                    {testimonials.map((_, i) => (
                      <button 
                        key={i} 
                        onClick={() => setCurrentIndex(i)}
                        className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-8 bg-brand-400' : 'w-2 bg-white/30 hover:bg-white/50'}`}
                        aria-label={`Nhận xét ${i + 1}`}
                      />
                    ))}
                  </div>

                  <Link 
                    to={`/product/${testimonials[currentIndex].productId}`}
                    className="inline-flex items-center gap-2 text-brand-300 hover:text-brand-100 transition-colors font-medium text-lg whitespace-nowrap"
                  >
                    {t('Xem thêm về')} <span className="font-bold underline underline-offset-4">{testimonials[currentIndex].productName}</span> <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}

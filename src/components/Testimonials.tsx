import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

const testimonials = [
  {
    content: "Trước kia mình rất sợ ám vàng mắc cài, đánh răng thì hay chảy máu nướu. Từ khi chuyển sang dùng tinh chất rau má của FURANO, nướu khỏe hẳn, đánh răng thơm lâu dã man. Một trải nghiệm hoàn toàn khác biệt so với các sản phẩm trước đây.",
  },
  {
    content: "Viên sủi vệ sinh khay niềng của FURANO thực sự là 'chân ái'. Đi làm chỉ cần thả vào cốc nước 15p là khay sạch bong, trong veo không mùi hôi. Highly recommend cho các bạn xài Invisalign nhẹ nhõm hẳn đi vài phần.",
  },
  {
    content: "Cháu nhà tôi tuổi dậy thì lại lười vệ sinh mắc cài, nha sĩ cứ dọa sâu răng hoài. Mua bộ này về, cháu thích cái vị cherry với bàn chải màu lạ mắt nên tự giác đánh răng súc miệng khỏi phải nhắc. Tốn kém xíu nhưng yên tâm.",
  }
];

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
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 w-full">
          
          <div className="w-full lg:w-5/12 text-center lg:text-left">
            <h2 className="text-brand-300 font-semibold tracking-wider uppercase text-sm mb-3">{t("Hơn cả sự hài lòng")}</h2>
            <h3 className="text-4xl md:text-5xl font-bold leading-tight">
              {t("Lời tâm tình từ")} <br /> <span className="font-serif italic font-normal text-brand-100">{t("Đồng Niềng")}</span>
            </h3>
            
            <div className="flex items-center justify-center lg:justify-start gap-2 mt-10">
              {testimonials.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-8 bg-brand-400' : 'w-2 bg-white/30 hover:bg-white/50'}`}
                  aria-label={`Nhận xét ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="w-full lg:w-7/12 relative min-h-[350px] md:min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 md:p-10 rounded-[2rem] relative flex flex-col justify-center h-full absolute inset-0"
              >
                <Quote className="absolute top-8 right-8 w-16 h-16 text-white/5" strokeWidth={1} />
                
                <div className="flex items-center gap-1 mb-6 text-amber-400">
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} className="w-6 h-6 fill-current" />
                  ))}
                </div>
                
                <p className="text-brand-50 text-xl md:text-2xl leading-relaxed italic relative z-10">
                  "{t(testimonials[currentIndex].content)}"
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}

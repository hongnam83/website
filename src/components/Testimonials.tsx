import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Linh Châu",
    role: "Sinh viên, 21 tuổi (Niềng mắc cài kim loại)",
    content: "Trước kia mình rất sợ ám vàng mắc cài, đánh răng thì hay chảy máu nướu. Từ khi chuyển sang dùng tinh chất rau má của SABAI CARE, nướu khỏe hẳn, đánh răng thơm lâu dã man. Một trải nghiệm hoàn toàn khác biệt so với các sản phẩm trước đây.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Mai Chi",
    role: "Nhân viên văn phòng, 26 tuổi (Invisalign)",
    content: "Viên sủi vệ sinh khay niềng của SABAI thực sự là 'chân ái'. Đi làm chỉ cần thả vào cốc nước 15p là khay sạch bong, trong veo không mùi hôi. Highly recommend cho các bạn xài Invisalign nhẹ nhõm hẳn đi vài phần.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Cô Bích Hồng",
    role: "Phụ huynh bé Tuấn Anh (15 tuổi)",
    content: "Cháu nhà tôi tuổi dậy thì lại lười vệ sinh mắc cài, nha sĩ cứ dọa sâu răng hoài. Mua bộ này về, cháu thích cái vị cherry với bàn chải màu lạ mắt nên tự giác đánh răng súc miệng khỏi phải nhắc. Tốn kém xíu nhưng yên tâm.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-brand-900 text-white overflow-hidden relative" id="testimonials">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/noise-pattern-with-subtle-cross-lines.png')] opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-brand-300 font-semibold tracking-wider uppercase text-sm mb-3">Hơn cả sự hài lòng</h2>
          <h3 className="text-3xl md:text-5xl font-bold mb-6">
            Lời tâm tình từ <br /> <span className="font-serif italic font-normal text-brand-100">Đồng Niềng</span>
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl relative"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-white/10" />
              <div className="flex items-center gap-1 mb-6 text-amber-400">
                {[...Array(t.rating)].map((_, index) => (
                  <Star key={index} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-brand-50 text-lg leading-relaxed mb-8 italic">
                "{t.content}"
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-brand-400" />
                <div>
                  <h4 className="font-bold text-white">{t.name}</h4>
                  <p className="text-brand-300 text-sm">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

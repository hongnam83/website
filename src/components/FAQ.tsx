import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "Sản phẩm SABAI CARE có dùng được cho răng nhạy cảm không?",
    answer: "Hoàn toàn được. Công thức của chúng tôi không chứa chất mài mòn mạnh (low RDA), an toàn tuyệt đối cho men răng đang trong giai đoạn yếu ớt khi chịu quá trình kéo chỉnh của mắc cài."
  },
  {
    question: "Bao nhiêu lâu thì nên thay đổi bàn chải kẽ?",
    answer: "Với người đang niềng răng, nha sĩ khuyên nên làm vệ sinh bàn chải sau mỗi lần sử dụng và thay thế bàn chải/đầu bàn chải kẽ 2-3 tuần một lần để đảm bảo vệ sinh và hiệu quả làm sạch tốt nhất."
  },
  {
    question: "Viên sủi Invisalign có làm ố màu khay không?",
    answer: "Không. Viên sủi SABAI làm sạch bằng bọt khí O2 siêu nhỏ và các enzym diệt khuẩn, hoàn toàn không sử dụng chất nhuộm màu độc hại gây ảnh hưởng đến cấu trúc nhựa và độ trong suốt của khay niềng."
  },
  {
    question: "SABAI CARE có hỗ trợ giao hàng hỏa tốc trong nội thành không?",
    answer: "Có. Chúng tôi hỗ trợ giao ngay trong 2-4h đối với khu vực nội thành Hà Nội, Đà Nẵng và TP.HCM. Phí giao hàng hỏa tốc sẽ được tính theo biểu phí của ứng dụng vận chuyển hiện hành."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-gray-50" id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Câu hỏi thường gặp</h2>
          <p className="text-gray-600">Những thắc mắc phổ biến nhất của các Đồng Niềng.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-semibold text-gray-900 text-lg">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-brand-800' : ''}`} 
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

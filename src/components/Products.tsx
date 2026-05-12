import { motion } from 'motion/react';
import { ShoppingCart } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Kem Đánh Răng 7 Benefits',
    category: 'Bảo Vệ Toàn Diện',
    price: '185,000đ',
    image: 'https://images.unsplash.com/photo-1559598467-f8b76c8105d0?auto=format&fit=crop&q=80&w=600',
    description: 'Bảo vệ kép, giảm ê buốt và ngăn ngừa vệt trắng xuất hiện quanh mắc cài. Hương thảo mộc the mát.',
    color: 'bg-teal-50 text-teal-700'
  },
  {
    id: 2,
    name: 'Kem Đánh Răng White Expert',
    category: 'Sáng Bóng Thẩm Mỹ',
    price: '210,000đ',
    image: 'https://images.unsplash.com/photo-1596755490226-d62f6b8c9fd6?auto=format&fit=crop&q=80&w=600',
    description: 'Công thức nhẹ dịu làm sáng men răng, phù hợp cho team chuộng thẩm mỹ, thích chụp ảnh.',
    color: 'bg-rose-50 text-rose-700'
  },
  {
    id: 3,
    name: 'Viên Sủi Invisalign Clear',
    category: 'Vệ Sinh Khay Niềng',
    price: '250,000đ',
    image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&q=80&w=600',
    description: 'Chuyên dụng cho team khay trong suốt. Tiêu diệt 99.9% vi khuẩn gây mùi, giữ khay luôn trong vắt.',
    color: 'bg-blue-50 text-blue-700'
  },
  {
    id: 4,
    name: 'Nước Súc Miệng Cherry Fresh',
    category: 'Ngăn Ngừa Vi Khuẩn',
    price: '145,000đ',
    image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=600',
    description: 'Len lỏi vào góc khuất nhất, cuốn trôi mảng bám với hương Cherry ngọt ngào được giới trẻ yêu thích.',
    color: 'bg-purple-50 text-purple-700'
  }
];

export default function Products() {
  return (
    <section className="py-24 bg-gray-50" id="products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-brand-800 font-semibold tracking-wider uppercase text-sm mb-3">Hệ sinh thái chăm sóc</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Thiết kế riêng cho <span className="font-serif italic text-brand-800">răng niềng</span>
          </h3>
          <p className="text-gray-600 text-lg">
            Khám phá bộ giải pháp toàn diện giúp bảo vệ nụ cười của bạn và xúc tác nhanh quá trình chỉnh nha an toàn.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={product.id}
              className="bg-white rounded-[2rem] p-4 shadow-[0_4px_24px_auto_rgba(0,0,0,0.02)] hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
            >
              <div className="relative aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-gray-100 mb-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${product.color}`}>
                  {product.category}
                </div>
              </div>
              
              <div className="flex-grow flex flex-col">
                <h4 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h4>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                  {product.description}
                </p>
                
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-brand-800 font-bold text-xl">{product.price}</span>
                  <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-900 hover:bg-brand-800 hover:text-white transition-colors">
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-brand-800 bg-brand-50 hover:bg-brand-100 rounded-full transition-colors font-semibold">
            Xem Tất Cả Sản Phẩm
          </button>
        </div>
      </div>
    </section>
  );
}

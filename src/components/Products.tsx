import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

type Variant = {
  name: string;
  colorClass: string;
  image: string;
};

type Product = {
  name: string;
  features: string[];
  image?: string;
  variants?: Variant[];
};

const categories = [
  {
    id: 'khi-nieng',
    title: 'Chăm Sóc Khi Niềng',
    description: 'Chuyên dụng cho người đang mắc cài, bảo vệ toàn diện nướu và men răng.',
    products: [
      {
        name: 'Kem đánh răng Ortho Sabai',
        features: ['Tái khoáng hóa men răng', 'Kháng khuẩn CPC & Fluoride'],
        variants: [
          { name: 'Nha Đam', colorClass: 'bg-green-500', image: 'https://images.unsplash.com/photo-1559598467-f8b76c8105d0?auto=format&fit=crop&q=80&w=600&color=green' },
          { name: 'Bạc Hà', colorClass: 'bg-blue-500', image: 'https://images.unsplash.com/photo-1559598467-f8b76c8105d0?auto=format&fit=crop&q=80&w=600&color=blue' }
        ]
      },
      {
        name: 'Nước súc miệng Ortho Sabai',
        features: ['Không cồn', 'Dịu nhẹ nướu', 'Làm sạch sâu khoang miệng'],
        variants: [
          { name: 'Nha Đam', colorClass: 'bg-pink-400', image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=600&color=pink' },
          { name: 'Bạc Hà', colorClass: 'bg-blue-400', image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=600&color=cyan' }
        ]
      },
      {
        name: 'Bàn chải kẽ Fluocaril',
        features: ['Size SS, S, M', 'Làm sạch sâu dưới dây cung', 'Cán uốn linh hoạt'],
        variants: [
          { name: 'Size M', colorClass: 'bg-green-400', image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&q=80&w=600&color=green' },
          { name: 'Size S', colorClass: 'bg-yellow-400', image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&q=80&w=600&color=yellow' },
          { name: 'Size SS', colorClass: 'bg-blue-400', image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&q=80&w=600&color=blue' }
        ]
      },
      {
        name: 'Bàn chải Fluocaril Hybrid',
        features: ['Lông chải chữ V', 'Slim & Soft', 'Spiral xoắn ốc'],
        image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600',
      }
    ]
  },
  {
    id: 'sau-nieng',
    title: 'Chăm Sóc Sau Niềng (Duy Trì)',
    description: 'Hỗ trợ tháo niềng, vệ sinh hàm duy trì và tăng cường độ vững chắc cho răng.',
    products: [
      {
        name: 'Kem đánh răng 7 Benefits',
        features: ['Tái khoáng men răng', 'Làm trắng tự nhiên', 'Chống ê buốt'],
        image: 'https://images.unsplash.com/photo-1596755490226-d62f6b8c9fd6?auto=format&fit=crop&q=80&w=600',
      },
      {
        name: 'Viên sủi vệ sinh ngâm khay',
        features: ['Sạch vi khuẩn 99.9%', 'Duy trì độ trong suốt'],
        variants: [
          { name: 'Bạc Hà', colorClass: 'bg-blue-400', image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&q=80&w=600&color=mint' },
          { name: 'Hoa Hồng', colorClass: 'bg-pink-400', image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&q=80&w=600&color=rose' },
          { name: 'Táo Xanh', colorClass: 'bg-green-400', image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&q=80&w=600&color=apple' }
        ]
      }
    ]
  },
  {
    id: 'trang-rang-khu-mui',
    title: 'Trắng Răng & Khử Mùi',
    description: 'Giữ hơi thở thơm mát tức thì, nuôi dưỡng men răng trắng sáng.',
    products: [
      {
        name: 'White Expert',
        features: ['Hạt mài mòn siêu mịn', 'Không mòn men', 'Sáng tự nhiên'],
        image: 'https://images.unsplash.com/photo-1559598467-f8b76c8105d0?auto=format&fit=crop&q=80&w=600',
      },
      {
        name: 'Breath Expert',
        features: ['Đặc trị mùi hôi', 'Tinh dầu thiên nhiên', 'Bạc hà the mát'],
        image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=600',
      },
      {
        name: 'Bình xịt Fresh Mint',
        features: ['Thơm mát tức thì', 'Dưỡng ẩm khoang miệng', 'Chứa Xylitol & CPC'],
        image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600',
      }
    ]
  }
];

function ProductCard({ product }: { product: Product }) {
  const hasVariants = product.variants && product.variants.length > 0;
  const [selectedVariant, setSelectedVariant] = useState(hasVariants ? 0 : -1);

  const currentImage = hasVariants && product.variants ? product.variants[selectedVariant].image : product.image;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-[1.5rem] p-4 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full cursor-pointer"
    >
      <div className="relative aspect-square rounded-[1rem] overflow-hidden bg-gray-50 mb-4 mix-blend-multiply">
        <img
          src={currentImage}
          alt={product.name}
          className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      {hasVariants && product.variants && (
        <div className="flex items-center gap-2 mb-4 px-1">
          {product.variants.map((variant, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.preventDefault();
                setSelectedVariant(idx);
              }}
              className={`w-6 h-6 rounded-full border-2 transition-all ${
                selectedVariant === idx ? 'border-gray-900 scale-110' : 'border-transparent hover:scale-110'
              } flex items-center justify-center`}
              title={variant.name}
            >
              <span className={`w-full h-full rounded-full ${variant.colorClass} shadow-inner`}></span>
            </button>
          ))}
          <span className="text-xs text-gray-500 ml-2">{product.variants[selectedVariant].name}</span>
        </div>
      )}
      
      <div className="flex-grow flex flex-col">
        <h5 className="text-lg font-bold text-gray-900 mb-3">{product.name}</h5>
        <ul className="space-y-2 mb-6">
          {product.features.map((feature, fIndex) => (
            <li key={fIndex} className="flex items-start text-sm text-gray-600">
              <CheckCircle2 className="w-4 h-4 text-brand-500 mr-2 shrink-0 mt-0.5" />
              <span className="leading-tight">{feature}</span>
            </li>
          ))}
        </ul>
        
        <div className="mt-auto pt-4 border-t border-gray-100 font-medium text-brand-800 text-sm flex items-center group-hover:text-brand-900">
          Khám Phá Chi Tiết <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
}

export default function Products() {
  return (
    <section className="py-24 bg-gray-50" id="products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-800 font-semibold tracking-wider uppercase text-sm mb-3">Danh Mục Sản Phẩm</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Thiết kế chuyên biệt cho <br className="hidden md:block" /> <span className="font-serif italic text-brand-800">Từng giai đoạn chỉnh nha</span>
          </h3>
          <p className="text-gray-600 text-lg">
            Sự kết hợp hoàn hảo giữa y khoa và dược liệu tự nhiên. Khám phá các dòng sản phẩm của FURANO giúp bảo vệ nụ cười của bạn.
          </p>
        </div>

        <div className="space-y-24">
          {categories.map((category, catIndex) => (
            <div key={category.id} className="scroll-mt-24">
              <div className="mb-10 text-center md:text-left flex flex-col md:flex-row items-center md:items-end justify-between gap-4 border-b border-gray-200 pb-4">
                <div>
                  <h4 className="text-2xl font-bold text-gray-900">{category.title}</h4>
                  <p className="text-gray-500 mt-2">{category.description}</p>
                </div>
                <a href="#" className="flex items-center text-brand-800 font-medium hover:text-brand-900 group whitespace-nowrap">
                  Xem tất cả {category.title} <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {category.products.map((product, pIndex) => (
                  <ProductCard key={pIndex} product={product} />
                ))}
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}

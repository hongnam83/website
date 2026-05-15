import { useParams, Link } from 'react-router-dom';
import {ArrowLeft, CheckCircle2 } from 'lucide-react';
import { categories } from '../data/products';
import { useState } from 'react';
import CTASection from '../components/CTASection';

export default function ProductDetailPage() {
  const { id } = useParams();
  
  // Find product across all categories
  const product = categories.flatMap(cat => cat.products).find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen pt-32 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Không tìm thấy sản phẩm</h2>
        <Link to="/products" className="text-brand-800 font-medium hover:underline">
          Quay lại danh sách sản phẩm
        </Link>
      </div>
    );
  }

  const hasVariants = product.variants && product.variants.length > 0;
  const [selectedVariant, setSelectedVariant] = useState(hasVariants ? 0 : -1);

  const currentImage = hasVariants && product.variants ? product.variants[selectedVariant].image : product.image;

  return (
    <main className="pt-24 min-h-screen bg-gray-50 flex flex-col">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow w-full">
        <Link to="/products" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-brand-800 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Tất cả sản phẩm
        </Link>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 bg-white p-6 md:p-12 rounded-[2rem] shadow-sm border border-gray-100 items-start">
          {/* Image Gallery */}
          <div className="space-y-6 sticky top-24">
            <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden mix-blend-multiply flex items-center justify-center border border-gray-100">
              <img 
                src={currentImage} 
                alt={product.name} 
                className="w-full h-full object-cover mix-blend-multiply rounded-2xl"
              />
            </div>
            
            {hasVariants && product.variants && (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-500">Lựa chọn phân loại:</span>
                <div className="flex gap-3">
                  {product.variants.map((variant, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedVariant(idx)}
                      className={`relative w-8 h-8 rounded-full border-2 transition-all ${
                        selectedVariant === idx ? 'border-gray-900 scale-110' : 'border-transparent hover:scale-110'
                      } flex items-center justify-center`}
                      title={variant.name}
                    >
                      <span className={`w-full h-full rounded-full ${variant.colorClass} shadow-inner`}></span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {hasVariants && product.variants && (
               <div className="p-4 bg-brand-50 rounded-xl">
                 <p className="text-brand-800 font-medium">Đang chọn: <span className="font-bold">{product.variants[selectedVariant].name}</span></p>
               </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">{product.name}</h1>
            
            {product.specs && (
               <div className="inline-block px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 mb-6 w-fit">
                 {product.specs}
               </div>
            )}

            <div className="space-y-10">
              {/* Main Uses */}
              {product.mainUses && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Ưu Điểm Nổi Bật</h3>
                  <ul className="space-y-3">
                    {product.mainUses.map((use, i) => (
                      <li key={i} className="flex text-gray-600 leading-relaxed">
                        <CheckCircle2 className="w-5 h-5 text-brand-500 mr-3 shrink-0 mt-0.5" />
                        <span>{use}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Ingredients / Materials */}
              {product.ingredients && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Thành Phần & Công Thức</h3>
                  <ul className="space-y-3">
                    {product.ingredients.map((ing, i) => (
                      <li key={i} className="flex text-gray-600 leading-relaxed items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-400 mr-3 mt-2 shrink-0"></div>
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {product.materials && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Cấu Tạo Bàn Chải</h3>
                  <ul className="space-y-3">
                    {product.materials.map((mat, i) => (
                      <li key={i} className="flex text-gray-600 leading-relaxed items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-400 mr-3 mt-2 shrink-0"></div>
                        <span>{mat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-100">
              <button className="w-full sm:w-auto px-8 py-4 bg-brand-800 hover:bg-brand-900 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center text-lg">
                Nhận Tư Vấn Cho Sản Phẩm Này
              </button>
            </div>
          </div>
        </div>
      </div>
      <CTASection />
    </main>
  );
}

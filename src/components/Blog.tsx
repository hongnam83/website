import { motion } from 'motion/react';
import { ArrowRight, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Blog() {
  const { t } = useTranslation();

  const blogPosts = [
    {
      id: 1,
      title: t('Bí Quyết Niềng Răng Không Lo Sâu Răng: Hướng Dẫn Toàn Tập'),
      category: t('Niềng Răng'),
      image: 'https://images.unsplash.com/photo-1598256989476-b631d8c1c4f5?auto=format&fit=crop&q=80&w=600',
      date: t('10 Thg 5, 2026'),
      excerpt: t('Hành trình chỉnh nha đòi hỏi sự kiên nhẫn và chăm sóc đúng cách. Khám phá bí quyết loại bỏ thức ăn thừa và bảo vệ men răng tại nhà hiệu quả nhất.')
    },
    {
      id: 2,
      title: t('Tiêu Chí Chọn Kem Đánh Răng Cho Người Niềng Răng Chuẩn Y Khoa'),
      category: t('Chăm Sóc Hàng Ngày'),
      image: 'https://images.unsplash.com/photo-1559598467-f8b76c8105d0?auto=format&fit=crop&q=80&w=600',
      date: t('05 Thg 5, 2026'),
      excerpt: t('Không phải loại kem nào cũng phù hợp khi mang mắc cài. Cùng tìm hiểu tại sao bạn cần sử dụng loại kem chuyên dụng để ngăn ngừa vệt trắng.')
    },
    {
      id: 3,
      title: t('Viên Sủi Vệ Sinh Khay Duy Trì: Bí Quyết Kéo Dài Tuổi Thọ Khay'),
      category: t('Invisalign & Khay Trong'),
      image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&q=80&w=600',
      date: t('28 Thg 4, 2026'),
      excerpt: t('Tìm hiểu tầm quan trọng của việc vệ sinh khay Invisalign, retainer hàng ngày bằng viên sủi siêu sạch, ngăn chặn vi khuẩn và ố vàng.')
    },
    {
      id: 4,
      title: t('Viên Sủi Vệ Sinh Mắc Cài: Giải Pháp Sạch Sâu 99% Mảng Bám'),
      category: t('Giải Pháp Chuyên Sâu'),
      image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600',
      date: t('20 Thg 4, 2026'),
      excerpt: t('Vệ sinh mắc cài là bước cực kỳ quan trọng. Khám phá cách sử dụng bọt khí O2 tác động sâu và an toàn cho mọi chất liệu mắc cài.')
    }
  ];

  return (
    <section className="py-24 bg-white border-t border-gray-100" id="blog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-brand-800 font-semibold tracking-wider uppercase text-sm mb-3">{t("Góc Kiến Thức")}</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {t("Cẩm Nang")} <span className="font-serif italic text-brand-800">{t("Chăm Sóc Nụ Cười")}</span>
            </h3>
          </div>
          <a href="#" className="hidden md:inline-flex items-center text-brand-800 font-medium hover:text-brand-900 group">
            {t("Xem Tất Cả Bài Viết")}
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer flex flex-col h-full"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-gray-100">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur text-brand-800 text-xs font-bold rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="flex-grow flex flex-col">
                <div className="flex items-center text-gray-500 text-xs mb-3">
                  <Clock className="w-3.5 h-3.5 mr-1" />
                  {post.date}
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-brand-800 transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-auto pt-4 flex items-center text-sm font-medium text-brand-800">
                  {t("Đọc tiếp")} <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <a href="#" className="inline-flex items-center text-brand-800 font-medium hover:text-brand-900 group">
            {t("Xem Tất Cả Bài Viết")}
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}

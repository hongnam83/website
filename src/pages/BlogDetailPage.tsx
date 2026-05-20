import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Clock, CalendarDays, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { blogPosts } from '../data/blogPosts';
import CTASection from '../components/CTASection';

export default function BlogDetailPage() {
  const { id } = useParams();
  const { t } = useTranslation();
  
  const post = blogPosts.find(p => p.id === id);
  
  if (!post) {
    return (
      <div className="min-h-screen pt-32 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">{t("Không tìm thấy bài viết")}</h2>
        <Link to="/blog" className="text-brand-800 font-medium hover:underline">
           {t("Quay lại danh sách bài viết")}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Header */}
      <div className="bg-white border-b border-gray-100 pt-28 pb-12">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/blog" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-brand-800 mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("Tất cả bài viết")}
            </Link>
            
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-brand-50 text-brand-800 text-xs font-bold rounded-full">
                {t(post.category)}
              </span>
              <span className="flex items-center text-gray-500 text-sm">
                <CalendarDays className="w-4 h-4 mr-1.5" />
                {t(post.date)}
              </span>
              <span className="flex items-center text-gray-500 text-sm ml-2">
                <Clock className="w-4 h-4 mr-1.5" />
                5 {t("phút đọc")}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
               {t(post.title)}
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
               {t(post.excerpt)}
            </p>
         </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow w-full view-markdown">
         <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-12">
           <div className="aspect-[21/9] w-full bg-gray-100">
              <img 
               src={post.image} 
               alt={t(post.title)} 
               className="w-full h-full object-cover"
              />
           </div>
           
           <div className="p-8 md:p-12 lg:p-16">
              <div className="prose prose-lg md:prose-xl prose-brand max-w-none text-gray-700">
                <ReactMarkdown>{t(post.content)}</ReactMarkdown>
              </div>

              <div className="mt-16 pt-8 border-t border-gray-100 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <span className="text-gray-900 font-medium">{t("Chia sẻ bài viết:")}</span>
                    <button className="p-2 bg-gray-50 text-gray-600 rounded-full hover:bg-brand-50 hover:text-brand-800 transition-colors" title={t("Chia sẻ")}>
                       <Share2 className="w-5 h-5" />
                    </button>
                 </div>
                 <Link to="/blog" className="px-6 py-2 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors">
                    {t("Đọc thêm bài khác")}
                 </Link>
              </div>
           </div>
         </div>
      </div>
      
      <CTASection />
    </div>
  );
}

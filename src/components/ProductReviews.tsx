import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { db, collection, getDocs } from '../localDB';
import { useTranslation } from 'react-i18next';

export default function ProductReviews({ productId }: { productId: string }) {
  const { t } = useTranslation();
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const snap = await getDocs(collection(db, 'productReviews'));
        const allReviews = snap.docs.map((d: any) => ({id: d.id, ...d.data()}));
        const matchingReviews = allReviews.filter((r: any) => r.productId === productId);
        setReviews(matchingReviews);
      } catch (err) {
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };
    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  if (loading) {
    return <div className="mt-12 animate-pulse h-32 bg-gray-100 rounded-xl"></div>;
  }

  if (reviews.length === 0) {
    return (
      <div className="mt-12 pt-8 border-t border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6">{t("Đánh giá từ khách hàng")}</h3>
        <p className="text-gray-500 italic">{t("Chưa có đánh giá nào cho sản phẩm này.")}</p>
      </div>
    );
  }

  const averageRating = reviews.reduce((acc, curr) => acc + (Number(curr.rating) || 0), 0) / reviews.length;

  return (
    <div className="mt-12 pt-8 border-t border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6">{t("Đánh giá từ khách hàng")} ({reviews.length})</h3>
      
      <div className="flex items-center gap-2 mb-8">
        <div className="flex text-yellow-400">
           {[...Array(5)].map((_, i) => (
             <Star key={i} className={`w-6 h-6 ${i < Math.round(averageRating) ? 'fill-current' : 'text-gray-300'}`} />
           ))}
        </div>
        <span className="text-lg font-medium text-gray-700">{averageRating.toFixed(1)} / 5</span>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-gray-900">{review.authorName}</span>
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>
            <div className="flex text-yellow-400 mb-3">
              {[...Array(5)].map((_, i) => (
                 <Star key={i} className={`w-4 h-4 ${i < (Number(review.rating) || 0) ? 'fill-current' : 'text-gray-300'}`} />
               ))}
            </div>
            <p className="text-gray-700 leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

import { Facebook, Instagram, Youtube, Phone, Mail, MapPin } from 'lucide-react';
import FuranoLogo from './FuranoLogo';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 pt-20 pb-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center mb-6">
              <FuranoLogo className="w-auto h-12" />
            </a>
            <p className="text-sm leading-relaxed mb-6">
              Thương hiệu dược mỹ phẩm hàng đầu cung cấp giải pháp chăm sóc toàn diện chuẩn y khoa thiết kế riêng cho người niềng răng tại Việt Nam.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-brand-600 flex items-center justify-center transition-colors text-white">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-brand-600 flex items-center justify-center transition-colors text-white">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-brand-600 flex items-center justify-center transition-colors text-white">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Liên Hệ</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-gray-500 shrink-0" />
                <span>Số 123 Đường Nguyễn Trãi, Quận Thanh Xuân, Hà Nội, Việt Nam</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="w-5 h-5 text-gray-500 shrink-0" />
                <span>1900 6868 (8:00 - 22:00)</span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="w-5 h-5 text-gray-500 shrink-0" />
                <span>cskh@sabaicare.vn</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Hỗ Trợ Khách Hàng</h4>
            <ul className="space-y-3 text-sm flex flex-col">
              <li><a href="#" className="hover:text-white transition-colors">Chính sách vận chuyển</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Chính sách đổi trả & hoàn tiền</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Chính sách bảo mật thông tin</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Hướng dẫn mua hàng</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tra cứu đơn hàng</a></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Sản Phẩm</h4>
            <ul className="space-y-3 text-sm flex flex-col">
              <li><a href="#" className="hover:text-white transition-colors">Kem đánh răng mắc cài</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Viên sủi vệ sinh Invisalign</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Nước súc miệng Cherry</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Bàn chải kẽ chuyên dụng</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Combo Siêu Tiết Kiệm</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>&copy; {new Date().getFullYear()} CÔNG TY TNHH FURANO VN. All rights reserved.</p>
          <div className="flex gap-2 items-center">
            {/* Payment methods mock */}
            <div className="px-2 py-1 bg-white rounded text-gray-900 font-bold text-[10px]">VISA</div>
            <div className="px-2 py-1 bg-white rounded text-gray-900 font-bold text-[10px]">Mastercard</div>
            <div className="px-2 py-1 bg-white rounded text-gray-900 font-bold text-[10px]">MoMo</div>
            <div className="px-2 py-1 bg-white rounded text-gray-900 font-bold text-[10px]">VNPay</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { MessageCircle, Phone } from 'lucide-react';

export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      <a 
        href="https://zalo.me" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-600 transition-colors group relative"
      >
        <span className="absolute right-full mr-4 bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat Zalo
        </span>
        <MessageCircle className="w-6 h-6" />
      </a>
      
      <a 
        href="tel:0909090909" 
        className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-green-600 transition-colors group relative"
      >
        <span className="absolute right-full mr-4 bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Gọi Hotline
        </span>
        <Phone className="w-6 h-6" />
      </a>
    </div>
  );
}

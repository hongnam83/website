import { motion } from 'motion/react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { useState, useEffect } from 'react';

import FuranoLogo from './FuranoLogo';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Sản Phẩm', href: '#products' },
    { name: 'Về FURANO', href: '#about' },
    { name: 'Chu Trình Chăm Sóc', href: '#routine' },
    { name: 'Đánh Giá', href: '#testimonials' },
    { name: 'Góc Kiến Thức', href: '#blog' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex items-center z-50 group">
          <FuranoLogo className="w-auto h-10 md:h-12 group-hover:scale-105 transition-transform" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium hover:text-brand-800 transition-colors ${
                isScrolled ? 'text-gray-600' : 'text-gray-800'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4 z-50">
          <a
            href="#products"
            className="hidden md:inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-brand-800 hover:bg-brand-700 rounded-full transition-colors"
          >
            Nhận Tư Vấn
          </a>
          <button
            className={`lg:hidden p-2 -mr-2 ${isScrolled ? 'text-gray-900' : 'text-gray-900'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-100 py-4 px-4 lg:hidden"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium leading-6 text-gray-900 p-2 hover:bg-gray-50 rounded-lg"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-gray-100">
                <a
                  href="#products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center w-full px-4 py-3 text-base font-medium text-white bg-brand-800 rounded-xl"
                >
                  Nhận Tư Vấn
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}

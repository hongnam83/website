import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
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
    { name: 'Trang Chủ', href: '/' },
    { name: 'Sản Phẩm', href: '/products' },
    { name: 'Về FURANO', href: '/about' },
    { name: 'Góc Kiến Thức', href: '/blog' },
    { name: 'Hỏi Đáp', href: '/faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-brand-100/90 backdrop-blur-md shadow-sm py-4' : 'bg-brand-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link 
          to="/"
          className="flex items-center z-50 group"
          onClick={() => setMobileMenuOpen(false)}
        >
          <FuranoLogo className="w-auto h-8 md:h-10 group-hover:scale-105 transition-transform" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 bg-white/70 backdrop-blur-md px-8 py-3 rounded-full shadow-sm border border-gray-100">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.href}
              className={({ isActive }) => 
                `text-sm font-semibold transition-colors hover:text-brand-800 ${
                  isActive ? 'text-brand-800' : 'text-gray-600'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4 z-50">
          <Link
            to="/products"
            className="hidden md:inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-brand-800 hover:bg-brand-700 rounded-full transition-colors shadow-md hover:shadow-lg"
          >
            Nhận Tư Vấn
          </Link>
          <button
            className="lg:hidden p-2 -mr-2 text-gray-900 bg-white rounded-full shadow-sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-100 py-4 px-4 lg:hidden h-screen flex flex-col">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => 
                    `text-base font-semibold leading-6 p-3 rounded-xl transition-colors ${
                      isActive ? 'bg-brand-50 text-brand-800' : 'text-gray-900 hover:bg-gray-50'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="pt-4 border-t border-gray-100 mt-4">
                <Link
                  to="/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center w-full px-4 py-3.5 text-base font-semibold text-white bg-brand-800 rounded-xl"
                >
                  Nhận Tư Vấn
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import BlogPage from './pages/BlogPage';
import FAQPage from './pages/FAQPage';
import FloatingContact from './components/FloatingContact';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-brand-50 selection:bg-brand-200 selection:text-brand-900 font-sans flex flex-col">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/faq" element={<FAQPage />} />
          </Routes>
        </div>
        <FloatingContact />
        <Footer />
      </div>
    </Router>
  );
}

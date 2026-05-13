/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Header from './components/Header';
import Hero from './components/Hero';
import Logos from './components/Logos';
import About from './components/About';
import Products from './components/Products';
import Routine from './components/Routine';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import FAQ from './components/FAQ';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white selection:bg-brand-200 selection:text-brand-900 font-sans">
      <Header />
      <main>
        <Hero />
        <Logos />
        <About />
        <Products />
        <Routine />
        <Testimonials />
        <Blog />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

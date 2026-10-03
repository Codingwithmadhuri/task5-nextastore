import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Truck, RefreshCw, Send } from 'lucide-react';
import heroImg from '../assets/images/hero_modern_lifestyle_1791039299089.jpg';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/products/ProductCard';
import { Button } from '../components/common/Button';
import { useToast } from '../context/ToastContext';

export const HomePage: React.FC = () => {
  const { showToast } = useToast();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured).slice(0, 4);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) {
      showToast('Please provide a valid email address.', 'error');
      return;
    }

    setNewsletterSubscribed(true);
    showToast('Subscribed to the NexaStore quarterly dispatch!', 'success');
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-wisteria-950 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-4 sm:mt-6 border border-wisteria-900">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="NexaStore Curated Lifestyle Collection"
            className="w-full h-full object-cover object-center opacity-40 scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-wisteria-950 via-wisteria-950/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-20 sm:py-28 lg:py-32 flex flex-col justify-center max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-aurora tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Autumn & Festive Collection 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15] mb-6 [text-wrap:balance]">
            Curated essentials engineered for modern living.
          </h1>

          <p className="text-sm sm:text-base text-wisteria-200 leading-relaxed mb-8 max-w-xl">
            Explore our meticulously designed collection of high-fidelity audio, architectural home decor, tailored apparel, and everyday accessories with seamless INR checkout.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link to="/products">
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="bg-wisteria hover:bg-wisteria-700 shadow-lg shadow-wisteria/30 text-white border-wisteria-500"
              >
                Browse Entire Catalog
              </Button>
            </Link>

            <Link to="/products?category=Electronics">
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 hover:bg-white/20 text-white border-white/25 backdrop-blur-sm"
              >
                Discover Electronics
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Featured Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-baseline justify-between gap-2 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Featured Categories
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Select a specialized collection to filter our catalog.
            </p>
          </div>
          <Link
            to="/products"
            className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center gap-1 group"
          >
            <span>View all 4 collections</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.id}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200"
            >
              <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs text-blue-600 font-medium pt-3 mt-3 border-t border-slate-100">
                  <span>Explore items</span>
                  <span className="text-slate-400 tabular-nums">({cat.itemCount} items)</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Trending / Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-baseline justify-between gap-2 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Trending Products
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Popular customer favorites, available for fast dispatch across India.
            </p>
          </div>
          <Link
            to="/products"
            className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center gap-1 group"
          >
            <span>See full catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Promotional Banner Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-gradient-to-r from-wisteria-800 to-wisteria-950 text-white rounded-3xl p-8 sm:p-12 shadow-sm border border-wisteria-700/50 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-xs font-semibold text-aurora uppercase tracking-widest block mb-2">
              Limited-Time Offer
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
              Complimentary Express Shipping on Orders Above ₹1,999
            </h3>
            <p className="text-xs sm:text-sm text-wisteria-200 leading-relaxed">
              Equip your workspace or upgrade your wardrobe today. Use code <code className="bg-white/15 px-2 py-0.5 rounded font-mono text-aurora text-xs font-semibold">NEXAFREE</code> during demo checkout to receive an extra 10% discount.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <Link to="/products">
              <Button
                variant="primary"
                size="md"
                className="bg-white text-wisteria-950 hover:bg-wisteria-50 border-white shadow-md font-semibold"
              >
                Shop Qualifying Items
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Benefits & Honest Trust Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-xs">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              The NexaStore Promise
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Engineered with transparent terms and honest customer service standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-2xl bg-wisteria-50 text-wisteria flex items-center justify-center mb-4">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-slate-900 text-base mb-1.5">Reliable Nationwide Delivery</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Partnered with verified domestic couriers to ensure insured, trackable delivery to all serviceable Indian pin codes.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-2xl bg-wisteria-50 text-wisteria flex items-center justify-center mb-4">
                <RefreshCw className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-slate-900 text-base mb-1.5">14-Day Returns Window</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                If an item does not meet your expectations, arrange a pickup within 14 days for a replacement or full refund.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-2xl bg-wisteria-50 text-wisteria flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-slate-900 text-base mb-1.5">Authenticity Guaranteed</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                We independently inspect fabrics, acoustics, and finishes before any batch is listed on our digital catalog.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Honest Newsletter Interface */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-slate-100 rounded-3xl p-8 sm:p-12 border border-slate-200">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Stay in the Loop
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
            Receive our quarterly catalog updates, new release announcements, and promotional codes. No spam, unsubscribe anytime.
          </p>

          {newsletterSubscribed ? (
            <div className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-emerald-700 bg-emerald-50 py-3 px-4 rounded-xl border border-emerald-200 max-w-sm mx-auto">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Thank you! You are subscribed to our catalog dispatches.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-2.5 text-sm bg-white border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <Button type="submit" variant="primary" size="md" rightIcon={<Send className="w-3.5 h-3.5" />}>
                Subscribe
              </Button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

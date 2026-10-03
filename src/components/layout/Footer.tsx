import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, RotateCcw, Truck, Headphones } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-wisteria-950 text-wisteria-200 pt-16 pb-12 border-t border-wisteria-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Badges / Honest Benefits Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-wisteria-800 text-sm">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-wisteria-900 text-aurora flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">Pan-India Delivery</h4>
              <p className="text-xs text-wisteria-300 leading-relaxed">
                Free standard shipping on orders above ₹1,999 across all pin codes.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-wisteria-900 text-aurora flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">14-Day Hassle-Free Returns</h4>
              <p className="text-xs text-wisteria-300 leading-relaxed">
                Easy return pickup and instant store credit or original source refund.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-wisteria-900 text-aurora flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">Authentic Quality</h4>
              <p className="text-xs text-wisteria-300 leading-relaxed">
                Every product in our curated collection is vetted for materials and durability.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-wisteria-900 text-aurora flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">Dedicated Support</h4>
              <p className="text-xs text-wisteria-300 leading-relaxed">
                Friendly customer concierge available Monday through Saturday, 9am to 7pm IST.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-12">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="text-xl font-bold tracking-tight text-white inline-block">
              Nexa<span className="text-aurora">Store</span>
            </Link>
            <p className="text-xs text-wisteria-300 leading-relaxed max-w-sm">
              A modern product catalog built with React, TypeScript, and Vite. Showcasing contemporary architecture, INR pricing, client-side filtering, and local shopping state persistence.
            </p>
            <div className="text-xs text-wisteria-300 pt-2">
              <span className="inline-block bg-wisteria-900/80 text-wisteria-200 px-2.5 py-1 rounded text-[11px] font-mono border border-wisteria-700">
                Task 5 · Full-Stack Deployment
              </span>
            </div>
          </div>

          {/* Col 2: Catalog Collections */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-wisteria-100 mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-wisteria-300">
              <li>
                <Link to="/products?category=Electronics" className="hover:text-white transition-colors">
                  Electronics & Audio
                </Link>
              </li>
              <li>
                <Link to="/products?category=Fashion" className="hover:text-white transition-colors">
                  Modern Apparel
                </Link>
              </li>
              <li>
                <Link to="/products?category=Accessories" className="hover:text-white transition-colors">
                  Everyday Accessories
                </Link>
              </li>
              <li>
                <Link to="/products?category=Home" className="hover:text-white transition-colors">
                  Home & Living
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-wisteria-100 mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-wisteria-300">
              <li>
                <Link to="/cart" className="hover:text-white transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-white transition-colors">
                  Saved Wishlist
                </Link>
              </li>
              <li>
                <span className="cursor-default">Shipping Information (India)</span>
              </li>
              <li>
                <span className="cursor-default">Exchange & Return Policy</span>
              </li>
              <li>
                <span className="cursor-default">Terms & Catalog Notice</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Project & Disclosure */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-wisteria-100 mb-4">
              Project Disclosure
            </h4>
            <p className="text-xs text-wisteria-300 leading-relaxed mb-3">
              This application is an educational capstone project demonstrating frontend architecture, state persistence, and responsive deployment.
            </p>
            <p className="text-xs text-wisteria-300 leading-relaxed">
              No real monetary transactions or payment gateways are processed.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-wisteria-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-wisteria-400">
          <p>© 2026 NexaStore. College Internship Task 5 Capstone Demonstration.</p>
          <div className="flex items-center gap-6">
            <span>Built with React 19 & Tailwind CSS</span>
            <span>·</span>
            <span>Indian Rupee (INR) Pricing</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

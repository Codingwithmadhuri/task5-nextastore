import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Search, Menu, X } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';

export const Navbar: React.FC = () => {
  const { totalItems } = useCart();
  const { wishlistCount } = useWishlist();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [navSearchQuery, setNavSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (navSearchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(navSearchQuery.trim())}`);
      setIsSearchOpen(false);
      setNavSearchQuery('');
    }
  };

  const navLinks = [
    { label: 'Catalog', to: '/products' },
    { label: 'Electronics', to: '/products?category=Electronics' },
    { label: 'Apparel', to: '/products?category=Fashion' },
    { label: 'Accessories', to: '/products?category=Accessories' },
    { label: 'Home', to: '/products?category=Home' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Zone 1: Brand Wordmark (Single text element) */}
          <Link
            to="/"
            className="text-xl font-bold tracking-tight text-wisteria-900 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora rounded-md py-1"
          >
            Nexa<span className="text-aurora">Store</span>
          </Link>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  `hover:text-wisteria transition-colors whitespace-nowrap ${
                    isActive ? 'text-wisteria font-semibold' : ''
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Zone 3: Primary Actions (Search, Wishlist, Cart, Mobile Toggle) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Search Bar / Toggle */}
            <div className="relative">
              {isSearchOpen ? (
                <form
                  onSubmit={handleSearchSubmit}
                  className="flex items-center bg-wisteria-50/60 rounded-lg px-2.5 py-1.5 focus-within:ring-2 focus-within:ring-aurora focus-within:bg-white border border-wisteria-200"
                >
                  <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search catalog..."
                    value={navSearchQuery}
                    onChange={(e) => setNavSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') setIsSearchOpen(false);
                    }}
                    autoFocus
                    className="w-32 sm:w-48 bg-transparent text-xs text-slate-900 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="text-slate-400 hover:text-slate-600 ml-1 p-0.5"
                    aria-label="Close search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-slate-600 hover:text-wisteria hover:bg-wisteria-50 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora"
                  aria-label="Open search input"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="relative p-2 text-slate-600 hover:text-wisteria hover:bg-wisteria-50 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora"
              aria-label={`Wishlist with ${wishlistCount} items`}
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center tabular-nums leading-none">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Cart Link */}
            <Link
              to="/cart"
              className="relative p-2 text-slate-600 hover:text-wisteria hover:bg-wisteria-50 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora"
              aria-label={`Cart with ${totalItems} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-1.5 right-1.5 min-w-4 h-4 px-1 rounded-full bg-wisteria text-white text-[10px] font-bold flex items-center justify-center tabular-nums leading-none">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-wisteria hover:bg-wisteria-50 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <form onSubmit={handleSearchSubmit} className="mb-4">
            <div className="relative flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search products..."
                value={navSearchQuery}
                onChange={(e) => setNavSearchQuery(e.target.value)}
                className="w-full bg-slate-100 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-aurora"
              />
            </div>
          </form>

          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-wisteria-50 text-wisteria font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="border-t border-slate-100 my-2 pt-2 flex flex-col gap-1">
              <Link
                to="/wishlist"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-slate-700 hover:bg-slate-50"
              >
                <span className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-500" /> Wishlist
                </span>
                <span className="text-xs text-slate-400 font-medium tabular-nums">{wishlistCount} items</span>
              </Link>
              <Link
                to="/cart"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-slate-700 hover:bg-slate-50"
              >
                <span className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-wisteria" /> Shopping Cart
                </span>
                <span className="text-xs text-slate-400 font-medium tabular-nums">{totalItems} items</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

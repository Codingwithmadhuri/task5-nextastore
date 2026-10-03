import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  Star,
  Truck,
  RotateCcw,
  ShieldCheck,
  Check,
  Plus,
  Minus,
  ArrowLeft,
  Share2,
} from 'lucide-react';
import { getProductById, getRelatedProducts } from '../data/products';
import { formatINR, calculateDiscountPercentage } from '../utils/currency';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { Button } from '../components/common/Button';
import { ProductCard } from '../components/products/ProductCard';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { useToast } from '../context/ToastContext';

export const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || '');

  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-10 shadow-xs">
          <h1 className="text-xl font-bold text-slate-900 mb-2">Product Not Found</h1>
          <p className="text-xs sm:text-sm text-slate-500 mb-6">
            The item you are searching for does not exist in our catalog or may have been discontinued.
          </p>
          <Link to="/products">
            <Button variant="primary" size="md">
              Return to Catalog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const discount = product.originalPrice
    ? calculateDiscountPercentage(product.originalPrice, product.price)
    : 0;
  const related = getRelatedProducts(product.id, 4);

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!', 'info');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/products" className="hover:text-wisteria transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Products</span>
        </Link>
        <span aria-hidden="true">/</span>
        <Link to={`/products?category=${product.category}`} className="hover:text-wisteria transition-colors">
          {product.category}
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-slate-900 font-medium truncate max-w-[200px] sm:max-w-xs">
          {product.name}
        </span>
      </nav>

      {/* Contiguous Purchase Module (PDP Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Gallery / High-Res Image */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl overflow-hidden border border-slate-200/80 bg-slate-100 shadow-xs relative">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              fallbackTitle={product.name}
              fallbackGradient={product.fallbackGradient}
              aspectRatioClass="aspect-[4/3] sm:aspect-[16/11]"
              className="w-full h-full object-cover"
            />
            {discount > 0 && (
              <span className="absolute top-4 left-4 bg-wisteria text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm">
                Save {discount}%
              </span>
            )}
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
          {/* Unboxed Metadata line */}
          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700 uppercase tracking-wider">{product.category}</span>
              <span aria-hidden="true">·</span>
              <span className={product.stock > 0 ? 'text-emerald-700 font-medium' : 'text-rose-600 font-medium'}>
                {product.stock > 0 ? `${product.stock} units available` : 'Out of stock'}
              </span>
            </div>
            <button
              type="button"
              onClick={handleShare}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md transition-colors"
              aria-label="Share product"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Title */}
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 leading-snug">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center gap-0.5 text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-slate-300'
                  }`}
                />
              ))}
            </div>
            <span className="font-bold text-slate-800">{product.rating.toFixed(1)}</span>
            <span className="text-slate-400">({product.reviewCount} customer reviews)</span>
          </div>

          {/* Price Block */}
          <div className="pt-2 pb-4 border-y border-slate-100">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-slate-900 tabular-nums">
                {formatINR(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-base text-slate-400 line-through tabular-nums">
                  {formatINR(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-xs text-slate-500 mt-1 block">
              Price inclusive of all applicable taxes. Free shipping on orders &gt; ₹1,999.
            </span>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {product.description}
          </p>

          {/* Specifications / Bullet Points */}
          {product.features && product.features.length > 0 && (
            <div className="space-y-2 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Key Highlights
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {product.features.map((feat, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-wisteria shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quantity and Primary Actions */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <label htmlFor="quantity-stepper" className="text-xs font-semibold text-slate-700">
                Quantity:
              </label>
              <div id="quantity-stepper" className="flex items-center border border-slate-200 rounded-lg bg-slate-50 p-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white rounded-md transition-colors disabled:opacity-30"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center text-xs font-bold text-slate-900 tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                  className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white rounded-md transition-colors disabled:opacity-30"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="primary"
                size="lg"
                className="flex-1"
                leftIcon={<ShoppingBag className="w-4 h-4" />}
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
              >
                {product.stock > 0 ? `Add to Cart · ${formatINR(product.price * quantity)}` : 'Out of Stock'}
              </Button>

              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
                className={`p-3 rounded-xl border transition-all ${
                  isFavorited
                    ? 'bg-rose-50 border-rose-300 text-rose-600'
                    : 'border-slate-300 hover:border-slate-400 text-slate-600 hover:text-rose-600 bg-white'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-rose-500' : ''}`} />
              </button>
            </div>
          </div>

          {/* Quick Trust Pillars */}
          <div className="pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-[11px] text-slate-500">
            <div className="flex flex-col items-center gap-1">
              <Truck className="w-4 h-4 text-wisteria" />
              <span>Fast Shipping</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <RotateCcw className="w-4 h-4 text-wisteria" />
              <span>14-Day Returns</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-wisteria" />
              <span>1-Yr Warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <section className="pt-8 border-t border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-6">
          Related from {product.category}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {related.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>

      {/* Sticky Bottom Buy Bar on Mobile Viewports */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3.5 shadow-lg flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[11px] text-slate-500 font-medium truncate max-w-[140px]">
            {product.name}
          </div>
          <div className="text-sm font-bold text-slate-900 tabular-nums">
            {formatINR(product.price * quantity)}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => toggleWishlist(product)}
            aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
            className={`p-2 rounded-lg border transition-all ${
              isFavorited
                ? 'bg-rose-50 border-rose-300 text-rose-600'
                : 'border-slate-300 text-slate-600 bg-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500' : ''}`} />
          </button>

          <Button
            variant="primary"
            size="sm"
            leftIcon={<ShoppingBag className="w-3.5 h-3.5" />}
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </div>
    </div>
  );
};

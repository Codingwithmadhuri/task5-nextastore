import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Check } from 'lucide-react';
import { Product } from '../../types/product';
import { formatINR, calculateDiscountPercentage } from '../../utils/currency';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isJustAdded, setIsJustAdded] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const discount = product.originalPrice
    ? calculateDiscountPercentage(product.originalPrice, product.price)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setIsJustAdded(true);
    setTimeout(() => setIsJustAdded(false), 1200);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 overflow-hidden">
      {/* Product Image & Badges */}
      <Link to={`/products/${product.id}`} className="relative block overflow-hidden bg-slate-100">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          fallbackTitle={product.name}
          fallbackGradient={product.fallbackGradient}
          aspectRatioClass="aspect-[4/3]"
          className="group-hover:scale-[1.03] transition-transform duration-300 ease-out"
        />

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-150 ${
            isFavorited
              ? 'bg-rose-50 text-rose-600 shadow-sm'
              : 'bg-white/85 text-slate-600 hover:text-rose-600 hover:bg-white shadow-xs'
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-transform active:scale-125 ${
              isFavorited ? 'fill-rose-500 text-rose-500' : ''
            }`}
          />
        </button>

        {/* Subtle Discount / Tag (at most 1 clean indicator, no badge sandwiches) */}
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-wisteria text-white text-[11px] font-semibold px-2 py-0.5 rounded-md shadow-xs">
            {discount}% OFF
          </span>
        )}
      </Link>

      {/* Product Information */}
      <div className="p-4 flex flex-col flex-1">
        {/* Unboxed Metadata Line with typographic separators */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5">
          <span className="font-medium text-slate-600">{product.category}</span>
          <span aria-hidden="true">·</span>
          <span>{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</span>
          {product.rating && (
            <>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-0.5 text-amber-600 font-medium">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                {product.rating.toFixed(1)}
              </span>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-slate-900 text-sm leading-snug line-clamp-1 mb-2 hover:text-wisteria transition-colors">
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h3>

        {/* Brief Description */}
        <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed flex-1">
          {product.description}
        </p>

        {/* Price and Cart Action */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100 mt-auto">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-slate-900 text-base tabular-nums">
                {formatINR(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-slate-400 line-through tabular-nums">
                  {formatINR(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-slate-400 block">incl. all taxes</span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-150 active:scale-95 disabled:opacity-40 disabled:pointer-events-none cursor-pointer ${
              isJustAdded
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-wisteria bg-wisteria-50 hover:bg-wisteria hover:text-white'
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            {isJustAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import { CartItem as CartItemType } from '../../types/cart';
import { formatINR } from '../../utils/currency';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { useCart } from '../../hooks/useCart';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;
  const itemTotal = product.price * quantity;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
      {/* Product Image and Meta */}
      <div className="flex items-center gap-4 min-w-0">
        <Link
          to={`/products/${product.id}`}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200/60"
        >
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            fallbackTitle={product.name}
            fallbackGradient={product.fallbackGradient}
            aspectRatioClass="aspect-square"
            className="w-full h-full object-cover"
          />
        </Link>

        <div className="min-w-0">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">
            {product.category}
          </span>
          <h4 className="font-semibold text-slate-900 text-sm sm:text-base leading-snug line-clamp-1 hover:text-blue-600 transition-colors">
            <Link to={`/products/${product.id}`}>{product.name}</Link>
          </h4>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-xs sm:text-sm font-semibold text-slate-700 tabular-nums">
              {formatINR(product.price)}
            </span>
            <span className="text-[10px] text-slate-400">each</span>
          </div>
          {product.stock <= 5 && (
            <span className="text-[10px] text-amber-700 font-medium mt-0.5 block">
              Only {product.stock} left in stock
            </span>
          )}
        </div>
      </div>

      {/* Controls & Line Total */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
        {/* Quantity Stepper */}
        <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 p-0.5">
          <button
            type="button"
            onClick={() => updateQuantity(product.id, quantity - 1)}
            disabled={quantity <= 1}
            className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white rounded-md transition-colors disabled:opacity-30 disabled:pointer-events-none"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-8 text-center text-xs font-semibold text-slate-900 tabular-nums">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => updateQuantity(product.id, quantity + 1)}
            disabled={quantity >= product.stock}
            className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white rounded-md transition-colors disabled:opacity-30 disabled:pointer-events-none"
            aria-label="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Item Total */}
        <div className="text-right min-w-[90px]">
          <div className="font-bold text-slate-900 text-sm sm:text-base tabular-nums">
            {formatINR(itemTotal)}
          </div>
          <span className="text-[10px] text-slate-400 block">Total</span>
        </div>

        {/* Remove Button */}
        <button
          type="button"
          onClick={() => removeItem(product.id)}
          className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
          aria-label={`Remove ${product.name} from cart`}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

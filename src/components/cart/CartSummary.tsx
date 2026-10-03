import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Tag, Check, Truck, ShieldCheck, X } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { formatINR } from '../../utils/currency';
import { Button } from '../common/Button';

interface CartSummaryProps {
  onProceedToCheckout: () => void;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ onProceedToCheckout }) => {
  const {
    subtotal,
    shipping,
    discount,
    total,
    freeShippingThreshold,
    amountNeededForFreeShipping,
    promoCode,
    applyPromoCode,
    removePromoCode,
    totalItems,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ message: string; success: boolean } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const result = applyPromoCode(couponInput);
    setCouponFeedback(result);
    if (result.success) {
      setCouponInput('');
    }
  };

  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-6">
      <h3 className="font-semibold text-base text-slate-900 pb-3 border-b border-slate-100">
        Order Summary ({totalItems} {totalItems === 1 ? 'item' : 'items'})
      </h3>

      {/* Free Shipping Tier Progress */}
      <div className="bg-wisteria-50/50 p-3.5 rounded-xl border border-wisteria-100">
        <div className="flex items-center gap-2 mb-2">
          <Truck className="w-4 h-4 text-wisteria shrink-0" />
          <p className="text-xs text-slate-700 font-medium">
            {amountNeededForFreeShipping === 0 ? (
              <span className="text-emerald-700 font-semibold">
                You've unlocked complimentary express shipping!
              </span>
            ) : (
              <span>
                Add <strong className="text-slate-900 tabular-nums">{formatINR(amountNeededForFreeShipping)}</strong> more for free express shipping.
              </span>
            )}
          </p>
        </div>
        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-wisteria h-full rounded-full transition-all duration-300"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      {/* Financial Line Items */}
      <div className="space-y-3 text-xs sm:text-sm">
        <div className="flex justify-between text-slate-600">
          <span>Subtotal</span>
          <span className="font-medium text-slate-900 tabular-nums">{formatINR(subtotal)}</span>
        </div>

        <div className="flex justify-between text-slate-600">
          <span className="flex items-center gap-1">
            Shipping Estimate
            {shipping === 0 && (
              <span className="text-[11px] text-emerald-600 font-medium">(Standard)</span>
            )}
          </span>
          <span className="font-medium tabular-nums">
            {shipping === 0 ? (
              <span className="text-emerald-600 font-semibold uppercase text-xs">Free</span>
            ) : (
              formatINR(shipping)
            )}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-emerald-700">
            <span className="flex items-center gap-1">
              <span>Coupon Discount ({promoCode})</span>
              <button
                type="button"
                onClick={removePromoCode}
                className="text-slate-400 hover:text-rose-500 p-0.5"
                aria-label="Remove coupon"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
            <span className="font-medium tabular-nums">- {formatINR(discount)}</span>
          </div>
        )}

        <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
          <div>
            <span className="font-semibold text-slate-900 text-base">Estimated Total</span>
            <span className="block text-[11px] text-slate-400">Includes all GST & import duties</span>
          </div>
          <span className="font-bold text-slate-900 text-xl tabular-nums">
            {formatINR(total)}
          </span>
        </div>
      </div>

      {/* Promo Code Form */}
      {!promoCode && (
        <form onSubmit={handleApplyCoupon} className="pt-2">
          <label htmlFor="coupon-input" className="text-xs font-semibold text-slate-700 block mb-1.5">
            Have a promo code?
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                id="coupon-input"
                type="text"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                placeholder="e.g. NEXAFREE"
                className="w-full text-xs pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg uppercase placeholder:normal-case focus:outline-none focus:ring-1 focus:ring-aurora focus:bg-white"
              />
            </div>
            <Button type="submit" variant="secondary" size="sm">
              Apply
            </Button>
          </div>
          {couponFeedback && !couponFeedback.success && (
            <p className="text-xs text-rose-600 mt-1">{couponFeedback.message}</p>
          )}
          <p className="text-[11px] text-slate-400 mt-1">
            Tip: Try <span className="font-mono font-medium text-slate-600">NEXAFREE</span> for 10% off.
          </p>
        </form>
      )}

      {/* Checkout CTA */}
      <div className="space-y-3 pt-2">
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          rightIcon={<ArrowRight className="w-4 h-4" />}
          onClick={onProceedToCheckout}
          disabled={totalItems === 0}
        >
          Proceed to Checkout (Demo)
        </Button>

        <div className="flex items-center justify-center gap-1.5 text-center text-[11px] text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Interactive academic demo · No credit card required</span>
        </div>

        <div className="text-center pt-2">
          <Link
            to="/products"
            className="text-xs text-wisteria hover:text-wisteria-800 font-medium transition-colors"
          >
            ← Continue Browsing Catalog
          </Link>
        </div>
      </div>
    </div>
  );
};

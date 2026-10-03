import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, ArrowLeft, AlertCircle } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { CartItem } from '../components/cart/CartItem';
import { CartSummary } from '../components/cart/CartSummary';
import { CheckoutModal } from '../components/cart/CheckoutModal';
import { EmptyState } from '../components/common/EmptyState';
import { Button } from '../components/common/Button';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, clearCart, totalItems } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <EmptyState
          icon={<ShoppingBag className="w-6 h-6 text-blue-600" />}
          title="Your shopping cart is empty"
          description="Looks like you haven't added anything to your cart yet. Explore our curated catalog to find items that match your style."
          actionText="Start Shopping"
          onAction={() => navigate('/products')}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link to="/products" className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Catalog</span>
            </Link>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Shopping Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
          </h1>
        </div>

        <div>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Trash2 className="w-3.5 h-3.5 text-rose-500" />}
            onClick={() => setShowClearConfirm(true)}
          >
            Clear Entire Cart
          </Button>
        </div>
      </div>

      {/* Cart Content: Item list (Left) + Summary (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Item List */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => (
            <CartItem key={item.product.id} item={item} />
          ))}
        </div>

        {/* Financial Summary */}
        <div className="lg:col-span-4 sticky top-24">
          <CartSummary onProceedToCheckout={() => setIsCheckoutOpen(true)} />
        </div>
      </div>

      {/* Clear Cart Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-slate-200 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Clear Shopping Cart?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to remove all {totalItems} items from your shopping bag? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-2 justify-center pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowClearConfirm(false)}
              >
                Keep Items
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  clearCart();
                  setShowClearConfirm(false);
                }}
              >
                Yes, Clear Cart
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Demo Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
};

import React, { useState } from 'react';
import { X, CheckCircle2, ShieldAlert, CreditCard, Smartphone, Banknote, Printer } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { CustomerDetails, OrderConfirmation } from '../../types/cart';
import { formatINR } from '../../utils/currency';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { items, subtotal, shipping, discount, total, clearCart } = useCart();

  const [formData, setFormData] = useState<CustomerDetails>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'upi_demo',
  });

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof CustomerDetails, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderConfirmation | null>(null);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const errors: Partial<Record<keyof CustomerDetails, string>> = {};

    if (!formData.fullName.trim()) {
      errors.fullName = 'Please enter your full name';
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errors.email = 'Please provide a valid email address';
    }
    if (!formData.phone.trim() || formData.phone.replace(/\D/g, '').length < 10) {
      errors.phone = 'Please provide a valid 10-digit contact number';
    }
    if (!formData.address.trim()) {
      errors.address = 'Street address is required';
    }
    if (!formData.city.trim()) {
      errors.city = 'City name is required';
    }
    if (!formData.postalCode.trim() || formData.postalCode.replace(/\D/g, '').length !== 6) {
      errors.postalCode = 'Valid 6-digit Indian PIN code required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate quick verification delay
    setTimeout(() => {
      const orderId = `NX-${Math.floor(100000 + Math.random() * 900000)}`;
      const confirmation: OrderConfirmation = {
        orderId,
        items: [...items],
        subtotal,
        shipping,
        discount,
        total,
        customer: { ...formData },
        placedAt: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        estimatedDelivery: '3 to 5 business days',
      };

      setCompletedOrder(confirmation);
      clearCart();
      setIsSubmitting(false);
    }, 600);
  };

  const handleClose = () => {
    setCompletedOrder(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
    >
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h2 id="checkout-modal-title" className="text-base font-bold text-slate-900">
              {completedOrder ? 'Order Demonstration Confirmed' : 'Checkout Demonstration'}
            </h2>
            <p className="text-xs text-slate-500">
              {completedOrder ? 'Receipt and confirmation details' : 'Academic Capstone Simulation · No actual charges'}
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {completedOrder ? (
          /* Confirmation Screen */
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Demonstration Order Placed!</h3>
              <p className="text-xs text-slate-500 mt-1">
                Order ID: <span className="font-mono font-bold text-slate-800">{completedOrder.orderId}</span>
              </p>
            </div>

            {/* Receipt Box */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/80 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 pb-3 border-b border-slate-200">
                <div>
                  <span className="text-slate-400 block mb-0.5">Deliver To:</span>
                  <p className="font-semibold text-slate-800">{completedOrder.customer.fullName}</p>
                  <p className="text-slate-600">
                    {completedOrder.customer.address}, {completedOrder.customer.city} - {completedOrder.customer.postalCode}
                  </p>
                  <p className="text-slate-600">Phone: {completedOrder.customer.phone}</p>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Order Metadata:</span>
                  <p className="text-slate-600">Date: {completedOrder.placedAt}</p>
                  <p className="text-slate-600">Estimate: {completedOrder.estimatedDelivery}</p>
                  <p className="text-slate-600">
                    Method: {completedOrder.customer.paymentMethod === 'cod' ? 'Cash on Delivery (Demo)' : completedOrder.customer.paymentMethod === 'upi_demo' ? 'UPI Simulator' : 'Card Sandbox'}
                  </p>
                </div>
              </div>

              {/* Itemized summary */}
              <div>
                <span className="text-slate-400 block mb-2 font-medium">Purchased Items ({completedOrder.items.length}):</span>
                <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                  {completedOrder.items.map((item) => (
                    <div key={item.product.id} className="flex justify-between items-center text-slate-700">
                      <span className="truncate max-w-[280px]">
                        {item.quantity} × {item.product.name}
                      </span>
                      <span className="tabular-nums font-medium text-slate-900 shrink-0">
                        {formatINR(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Final Total */}
              <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-sm font-bold text-slate-900">
                <span>Total Amount Paid (Simulated)</span>
                <span className="text-base text-wisteria tabular-nums">{formatINR(completedOrder.total)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-end pt-2">
              <Button
                variant="outline"
                size="md"
                leftIcon={<Printer className="w-4 h-4" />}
                onClick={() => window.print()}
              >
                Print Receipt
              </Button>
              <Button variant="primary" size="md" onClick={handleClose}>
                Back to Storefront
              </Button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handlePlaceOrder} className="p-6 sm:p-8 space-y-6">
            {/* Academic Disclosure Notice */}
            <div className="flex items-start gap-3 p-3.5 bg-wisteria-50/70 border border-wisteria-200/80 rounded-xl text-xs text-wisteria-950">
              <ShieldAlert className="w-4 h-4 text-wisteria shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold block mb-0.5">Simulation Notice:</strong>
                This checkout flow is an educational demonstration designed for Task 5. No financial transactions, debit/credit cards, or sensitive keys are utilized.
              </div>
            </div>

            {/* Customer Details Form */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                1. Shipping & Contact Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  required
                  placeholder="e.g. Madhuri Sontakke"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  error={formErrors.fullName}
                />
                <Input
                  label="Email Address"
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  error={formErrors.email}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Contact Phone"
                  type="tel"
                  required
                  placeholder="10-digit mobile number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  error={formErrors.phone}
                />
                <Input
                  label="PIN / Postal Code"
                  type="text"
                  required
                  placeholder="6-digit PIN (e.g. 400001)"
                  maxLength={6}
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  error={formErrors.postalCode}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <Input
                    label="Street Address / Flat / Floor"
                    required
                    placeholder="e.g. 402, Green Avenue, MG Road"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    error={formErrors.address}
                  />
                </div>
                <div>
                  <Input
                    label="City"
                    required
                    placeholder="e.g. Mumbai / Pune"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    error={formErrors.city}
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                2. Select Simulated Payment Option
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label
                  className={`flex flex-col p-3 rounded-xl border cursor-pointer transition-all ${
                    formData.paymentMethod === 'upi_demo'
                      ? 'border-wisteria bg-wisteria-50/50 shadow-xs ring-1 ring-wisteria'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Smartphone className="w-4 h-4 text-wisteria" />
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi_demo"
                      checked={formData.paymentMethod === 'upi_demo'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'upi_demo' })}
                      className="accent-wisteria"
                    />
                  </div>
                  <span className="text-xs font-semibold text-slate-900">UPI Simulator</span>
                  <span className="text-[10px] text-slate-500">GPay / PhonePe / Paytm demo</span>
                </label>

                <label
                  className={`flex flex-col p-3 rounded-xl border cursor-pointer transition-all ${
                    formData.paymentMethod === 'cod'
                      ? 'border-wisteria bg-wisteria-50/50 shadow-xs ring-1 ring-wisteria'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Banknote className="w-4 h-4 text-emerald-600" />
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                      className="accent-wisteria"
                    />
                  </div>
                  <span className="text-xs font-semibold text-slate-900">Cash on Delivery</span>
                  <span className="text-[10px] text-slate-500">Pay cash upon doorstep arrival</span>
                </label>

                <label
                  className={`flex flex-col p-3 rounded-xl border cursor-pointer transition-all ${
                    formData.paymentMethod === 'card_demo'
                      ? 'border-wisteria bg-wisteria-50/50 shadow-xs ring-1 ring-wisteria'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <CreditCard className="w-4 h-4 text-wisteria" />
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card_demo"
                      checked={formData.paymentMethod === 'card_demo'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'card_demo' })}
                      className="accent-wisteria"
                    />
                  </div>
                  <span className="text-xs font-semibold text-slate-900">Card Sandbox</span>
                  <span className="text-[10px] text-slate-500">Simulated test environment</span>
                </label>
              </div>
            </div>

            {/* Total and Submit */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div>
                <span className="text-xs text-slate-500 block">Total Demo Amount:</span>
                <span className="text-lg font-bold text-slate-900 tabular-nums">{formatINR(total)}</span>
              </div>

              <div className="flex gap-2">
                <Button type="button" variant="outline" size="md" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={isSubmitting}
                >
                  Confirm & Place Demo Order
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

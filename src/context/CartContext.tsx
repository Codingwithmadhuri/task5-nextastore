import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product } from '../types/product';
import { CartItem } from '../types/cart';
import { getFromStorage, saveToStorage } from '../utils/storage';
import { useToast } from './ToastContext';

const CART_STORAGE_KEY = 'nexastore_cart_v1';
const FREE_SHIPPING_THRESHOLD = 1999;
const STANDARD_SHIPPING_FEE = 149;

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  promoCode: string | null;
  promoDiscountRate: number;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { showToast } = useToast();

  const [items, setItems] = useState<CartItem[]>(() => {
    return getFromStorage<CartItem[]>(CART_STORAGE_KEY, []);
  });

  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [promoDiscountRate, setPromoDiscountRate] = useState<number>(0);

  // Synchronize with LocalStorage on state change
  useEffect(() => {
    saveToStorage(CART_STORAGE_KEY, items);
  }, [items]);

  const addItem = useCallback((product: Product, quantity = 1) => {
    if (quantity <= 0) return;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.product.id === product.id);

      if (existingIndex > -1) {
        const existingItem = prevItems[existingIndex];
        const newQuantity = Math.min(existingItem.quantity + quantity, product.stock);

        if (newQuantity === existingItem.quantity) {
          showToast(`Maximum available stock (${product.stock}) reached for this item.`, 'info');
          return prevItems;
        }

        const updated = [...prevItems];
        updated[existingIndex] = {
          ...existingItem,
          quantity: newQuantity,
        };
        showToast(`Updated "${product.name}" quantity to ${newQuantity}`, 'success');
        return updated;
      } else {
        const actualQuantity = Math.min(quantity, product.stock);
        showToast(`Added "${product.name}" to cart`, 'success');
        return [
          ...prevItems,
          {
            product,
            quantity: actualQuantity,
            addedAt: Date.now(),
          },
        ];
      }
    });
  }, [showToast]);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => {
      const itemToRemove = prev.find((item) => item.product.id === productId);
      if (itemToRemove) {
        showToast(`Removed "${itemToRemove.product.name}" from cart`, 'info');
      }
      return prev.filter((item) => item.product.id !== productId);
    });
  }, [showToast]);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems((prev) => {
      if (quantity <= 0) {
        return prev.filter((item) => item.product.id !== productId);
      }

      return prev.map((item) => {
        if (item.product.id === productId) {
          const clamped = Math.min(Math.max(1, quantity), item.product.stock);
          return { ...item, quantity: clamped };
        }
        return item;
      });
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setPromoCode(null);
    setPromoDiscountRate(0);
    showToast('Your shopping cart has been cleared.', 'info');
  }, [showToast]);

  const applyPromoCode = useCallback((code: string) => {
    const normalized = code.trim().toUpperCase();
    if (!normalized) {
      return { success: false, message: 'Please enter a coupon code.' };
    }

    if (normalized === 'NEXAFREE' || normalized === 'SAVE10') {
      setPromoCode(normalized);
      setPromoDiscountRate(0.1); // 10% discount
      showToast(`Promo code "${normalized}" applied (10% off)!`, 'success');
      return { success: true, message: '10% discount successfully applied!' };
    }

    if (normalized === 'INTERN20') {
      setPromoCode(normalized);
      setPromoDiscountRate(0.2); // 20% discount
      showToast(`Demo promo code "${normalized}" applied (20% off)!`, 'success');
      return { success: true, message: '20% Capstone discount applied!' };
    }

    showToast(`Coupon code "${code}" is invalid or expired.`, 'error');
    return { success: false, message: 'Invalid coupon code. Try "NEXAFREE" or "SAVE10".' };
  }, [showToast]);

  const removePromoCode = useCallback(() => {
    setPromoCode(null);
    setPromoDiscountRate(0);
    showToast('Coupon code removed.', 'info');
  }, [showToast]);

  // Derived financial computations
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  const discount = Math.round(subtotal * promoDiscountRate);
  const total = Math.max(0, subtotal - discount + (subtotal > 0 ? shipping : 0));
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        shipping,
        discount,
        total,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        amountNeededForFreeShipping,
        promoCode,
        promoDiscountRate,
        applyPromoCode,
        removePromoCode,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product } from '../types/product';
import { getFromStorage, saveToStorage } from '../utils/storage';
import { useToast } from './ToastContext';

const WISHLIST_STORAGE_KEY = 'nexastore_wishlist_v1';

interface WishlistContextType {
  wishlistIds: string[];
  wishlistCount: number;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { showToast } = useToast();

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    return getFromStorage<string[]>(WISHLIST_STORAGE_KEY, []);
  });

  useEffect(() => {
    saveToStorage(WISHLIST_STORAGE_KEY, wishlistIds);
  }, [wishlistIds]);

  const isInWishlist = useCallback(
    (productId: string) => wishlistIds.includes(productId),
    [wishlistIds]
  );

  const toggleWishlist = useCallback(
    (product: Product) => {
      setWishlistIds((prev) => {
        if (prev.includes(product.id)) {
          showToast(`Removed "${product.name}" from your wishlist.`, 'info');
          return prev.filter((id) => id !== product.id);
        } else {
          showToast(`Saved "${product.name}" to your wishlist.`, 'success');
          return [...prev, product.id];
        }
      });
    },
    [showToast]
  );

  const removeFromWishlist = useCallback(
    (productId: string) => {
      setWishlistIds((prev) => prev.filter((id) => id !== productId));
      showToast('Item removed from wishlist.', 'info');
    },
    [showToast]
  );

  const clearWishlist = useCallback(() => {
    setWishlistIds([]);
    showToast('Wishlist cleared.', 'info');
  }, [showToast]);

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistCount: wishlistIds.length,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextType {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}

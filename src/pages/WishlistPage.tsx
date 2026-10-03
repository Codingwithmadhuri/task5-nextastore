import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../hooks/useCart';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/products/ProductCard';
import { EmptyState } from '../components/common/EmptyState';
import { Button } from '../components/common/Button';

export const WishlistPage: React.FC = () => {
  const navigate = useNavigate();
  const { wishlistIds, clearWishlist } = useWishlist();
  const { addItem } = useCart();

  const savedProducts = PRODUCTS.filter((product) => wishlistIds.includes(product.id));

  const handleAddAllToCart = () => {
    savedProducts.forEach((product) => {
      if (product.stock > 0) {
        addItem(product, 1);
      }
    });
  };

  if (savedProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <EmptyState
          icon={<Heart className="w-6 h-6 text-rose-500" />}
          title="Your wishlist is empty"
          description="Save items you love while exploring the catalog to review later or transfer directly to your shopping bag."
          actionText="Explore Products"
          onAction={() => navigate('/products')}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header and Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            My Wishlist
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            You have <strong className="text-slate-900 font-semibold">{savedProducts.length}</strong> saved {savedProducts.length === 1 ? 'item' : 'items'} in your local storage.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Trash2 className="w-3.5 h-3.5" />}
            onClick={clearWishlist}
          >
            Clear Wishlist
          </Button>

          <Button
            variant="primary"
            size="sm"
            leftIcon={<ShoppingBag className="w-3.5 h-3.5" />}
            onClick={handleAddAllToCart}
          >
            Add All to Cart
          </Button>
        </div>
      </div>

      {/* Wishlist Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {savedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="text-center pt-8">
        <Link to="/products" className="text-xs text-blue-600 hover:text-blue-800 font-medium">
          ← Continue Browsing More Products
        </Link>
      </div>
    </div>
  );
};

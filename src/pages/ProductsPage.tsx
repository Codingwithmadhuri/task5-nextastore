import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { FilterState, ProductCategory, SortOption } from '../types/product';
import { ProductGrid } from '../components/products/ProductGrid';
import { ProductFilters } from '../components/products/ProductFilters';
import { ProductSearch } from '../components/products/ProductSearch';
import { Button } from '../components/common/Button';

const INITIAL_FILTERS: FilterState = {
  searchQuery: '',
  category: 'All',
  minPrice: 1000,
  maxPrice: 25000,
  inStockOnly: false,
  minRating: 0,
  sortBy: 'featured',
};

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize filters from URL search params if provided
  const [filters, setFilters] = useState<FilterState>(() => {
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');
    const sortParam = searchParams.get('sort');

    return {
      ...INITIAL_FILTERS,
      category: (categoryParam as ProductCategory) || 'All',
      searchQuery: searchParam || '',
      sortBy: (sortParam as SortOption) || 'featured',
    };
  });

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync state if URL changes externally
  useEffect(() => {
    const cat = searchParams.get('category') as ProductCategory | null;
    const q = searchParams.get('search');
    if (cat && cat !== filters.category) {
      setFilters((prev) => ({ ...prev, category: cat }));
    }
    if (q !== null && q !== filters.searchQuery) {
      setFilters((prev) => ({ ...prev, searchQuery: q }));
    }
  }, [searchParams]);

  // Handle updates to filters and update URL search params gracefully
  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => {
      const updated = { ...prev, ...newFilters };

      // Update URL params
      const params = new URLSearchParams();
      if (updated.category !== 'All') params.set('category', updated.category);
      if (updated.searchQuery.trim()) params.set('search', updated.searchQuery.trim());
      if (updated.sortBy !== 'featured') params.set('sort', updated.sortBy);
      setSearchParams(params, { replace: true });

      return updated;
    });
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setSearchParams({}, { replace: true });
  };

  // Filtered and sorted products computation
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Search Query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        const matchesTags = product.tags?.some((t) => t.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesCat && !matchesTags) {
          return false;
        }
      }

      // 2. Category
      if (filters.category !== 'All' && product.category !== filters.category) {
        return false;
      }

      // 3. Price Range
      if (product.price < filters.minPrice || product.price > filters.maxPrice) {
        return false;
      }

      // 4. In Stock Only
      if (filters.inStockOnly && product.stock <= 0) {
        return false;
      }

      // 5. Min Rating
      if (filters.minRating > 0 && product.rating < filters.minRating) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating-desc':
          return b.rating - a.rating;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'featured':
        default:
          // Featured items first, then newer arrivals
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return 0;
      }
    });
  }, [filters]);

  const activeFilterCount =
    (filters.category !== 'All' ? 1 : 0) +
    (filters.minPrice > 1000 || filters.maxPrice < 25000 ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.searchQuery.trim() ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header and Breadcrumbs */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Product Catalog
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Explore our complete collection of curated goods with guaranteed INR pricing and transparent specifications.
        </p>
      </div>

      {/* Top Search & Sorting Bar */}
      <ProductSearch
        searchQuery={filters.searchQuery}
        onSearchChange={(query) => handleFilterChange({ searchQuery: query })}
        sortBy={filters.sortBy}
        onSortChange={(sort) => handleFilterChange({ sortBy: sort })}
        totalResults={filteredProducts.length}
      />

      {/* Active Filter Indicators (if any active) */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-slate-400 font-medium">Active filters:</span>

          {filters.category !== 'All' && (
            <button
              type="button"
              onClick={() => handleFilterChange({ category: 'All' })}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 hover:border-slate-300 hover:text-slate-900 shadow-2xs transition-colors"
            >
              <span>Category: {filters.category}</span>
              <X className="w-3 h-3 text-slate-400" />
            </button>
          )}

          {filters.searchQuery.trim() && (
            <button
              type="button"
              onClick={() => handleFilterChange({ searchQuery: '' })}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 hover:border-slate-300 hover:text-slate-900 shadow-2xs transition-colors"
            >
              <span>Search: "{filters.searchQuery}"</span>
              <X className="w-3 h-3 text-slate-400" />
            </button>
          )}

          {(filters.minPrice > 1000 || filters.maxPrice < 25000) && (
            <button
              type="button"
              onClick={() => handleFilterChange({ minPrice: 1000, maxPrice: 25000 })}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 hover:border-slate-300 hover:text-slate-900 shadow-2xs transition-colors"
            >
              <span>Price: ₹{filters.minPrice} – ₹{filters.maxPrice}</span>
              <X className="w-3 h-3 text-slate-400" />
            </button>
          )}

          {filters.inStockOnly && (
            <button
              type="button"
              onClick={() => handleFilterChange({ inStockOnly: false })}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 hover:border-slate-300 hover:text-slate-900 shadow-2xs transition-colors"
            >
              <span>In-stock only</span>
              <X className="w-3 h-3 text-slate-400" />
            </button>
          )}

          {filters.minRating > 0 && (
            <button
              type="button"
              onClick={() => handleFilterChange({ minRating: 0 })}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 hover:border-slate-300 hover:text-slate-900 shadow-2xs transition-colors"
            >
              <span>Rating: {filters.minRating}+ ★</span>
              <X className="w-3 h-3 text-slate-400" />
            </button>
          )}

          <button
            type="button"
            onClick={handleResetFilters}
            className="text-wisteria hover:text-wisteria-800 underline underline-offset-2 ml-1 text-xs font-medium"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200">
        <span className="text-xs font-medium text-slate-600">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'item found' : 'items found'}
        </span>
        <Button
          variant="outline"
          size="sm"
          leftIcon={<SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />}
          onClick={() => setIsMobileFilterOpen(true)}
        >
          Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
        </Button>
      </div>

      {/* Main Grid & Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-1 sticky top-24">
          <ProductFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            totalProductsCount={PRODUCTS.length}
            filteredCount={filteredProducts.length}
          />
        </aside>

        {/* Product Grid Area */}
        <main className="lg:col-span-3">
          <ProductGrid
            products={filteredProducts}
            onResetFilters={handleResetFilters}
          />
        </main>
      </div>

      {/* Mobile Filter Slide Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-slate-900/60 backdrop-blur-xs">
          <div className="relative ml-auto w-full max-w-xs h-full bg-white shadow-2xl p-6 overflow-y-auto flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-sm text-slate-900">Refine Results</h3>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <ProductFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              totalProductsCount={PRODUCTS.length}
              filteredCount={filteredProducts.length}
            />

            <div className="mt-6 pt-4 border-t border-slate-100">
              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => setIsMobileFilterOpen(false)}
              >
                Show {filteredProducts.length} Results
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

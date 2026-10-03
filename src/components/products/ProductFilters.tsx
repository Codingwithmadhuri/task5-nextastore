import React from 'react';
import { Filter, RotateCcw, Check } from 'lucide-react';
import { ProductCategory, FilterState } from '../../types/product';
import { formatINR } from '../../utils/currency';

interface ProductFiltersProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalProductsCount: number;
  filteredCount: number;
  minPossiblePrice?: number;
  maxPossiblePrice?: number;
}

const CATEGORIES: { label: string; value: ProductCategory | 'All' }[] = [
  { label: 'All Categories', value: 'All' },
  { label: 'Electronics & Audio', value: 'Electronics' },
  { label: 'Modern Apparel', value: 'Fashion' },
  { label: 'Everyday Accessories', value: 'Accessories' },
  { label: 'Home & Living', value: 'Home' },
];

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  filteredCount,
  minPossiblePrice = 1000,
  maxPossiblePrice = 25000,
}) => {
  const isFiltered =
    filters.category !== 'All' ||
    filters.minPrice > minPossiblePrice ||
    filters.maxPrice < maxPossiblePrice ||
    filters.inStockOnly ||
    filters.minRating > 0 ||
    Boolean(filters.searchQuery);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500" />
          <h3 className="font-semibold text-sm text-slate-900">Filter Catalog</h3>
        </div>
        {isFiltered && (
          <button
            type="button"
            onClick={onResetFilters}
            className="flex items-center gap-1 text-xs text-wisteria hover:text-wisteria-800 font-medium transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Category Section */}
      <div>
        <label className="text-xs font-semibold text-slate-800 block mb-2.5">
          Categories
        </label>
        <div className="flex flex-col gap-1">
          {CATEGORIES.map((cat) => {
            const isActive = filters.category === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => onFilterChange({ category: cat.value })}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left ${
                  isActive
                    ? 'bg-wisteria-50 text-wisteria font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span>{cat.label}</span>
                {isActive && <Check className="w-3.5 h-3.5 text-wisteria" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Slider / Inputs */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-800">
            Price Range (INR)
          </label>
          <span className="text-[11px] text-slate-500 tabular-nums">
            {formatINR(filters.minPrice)} – {formatINR(filters.maxPrice)}
          </span>
        </div>

        <div className="space-y-2">
          <input
            type="range"
            min={minPossiblePrice}
            max={maxPossiblePrice}
            step={500}
            value={filters.maxPrice}
            onChange={(e) => onFilterChange({ maxPrice: Number(e.target.value) })}
            className="w-full accent-wisteria cursor-pointer h-1.5 bg-slate-200 rounded-lg appearance-none"
            aria-label="Max price range slider"
          />
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <span className="text-[10px] text-slate-400 block mb-0.5">Min</span>
              <input
                type="number"
                value={filters.minPrice}
                min={minPossiblePrice}
                max={filters.maxPrice}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val <= filters.maxPrice) {
                    onFilterChange({ minPrice: Math.max(minPossiblePrice, val) });
                  }
                }}
                className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-md text-slate-900 focus:outline-none focus:ring-1 focus:ring-aurora"
              />
            </div>
            <span className="text-slate-400 text-xs mt-3">–</span>
            <div className="flex-1">
              <span className="text-[10px] text-slate-400 block mb-0.5">Max</span>
              <input
                type="number"
                value={filters.maxPrice}
                min={filters.minPrice}
                max={maxPossiblePrice}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val >= filters.minPrice) {
                    onFilterChange({ maxPrice: Math.min(maxPossiblePrice, val) });
                  }
                }}
                className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-md text-slate-900 focus:outline-none focus:ring-1 focus:ring-aurora"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stock Availability */}
      <div className="pt-2 border-t border-slate-100">
        <label className="flex items-center gap-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onFilterChange({ inStockOnly: e.target.checked })}
            className="w-4 h-4 rounded text-wisteria focus:ring-aurora border-slate-300 accent-wisteria cursor-pointer"
          />
          <span className="text-xs font-medium text-slate-700">In-Stock Items Only</span>
        </label>
      </div>

      {/* Minimum Rating */}
      <div className="pt-2 border-t border-slate-100">
        <label className="text-xs font-semibold text-slate-800 block mb-2">
          Customer Rating
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { label: 'All', value: 0 },
            { label: '4.0+ ★', value: 4.0 },
            { label: '4.7+ ★', value: 4.7 },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onFilterChange({ minRating: option.value })}
              className={`py-1.5 px-2 rounded-lg text-xs font-medium transition-colors text-center ${
                filters.minRating === option.value
                  ? 'bg-wisteria text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active Results Summary */}
      <div className="pt-3 border-t border-slate-100 text-center">
        <span className="text-xs text-slate-500">
          Showing <strong className="text-slate-900 font-semibold">{filteredCount}</strong> results
        </span>
      </div>
    </div>
  );
};

import React from 'react';
import { Search, X, ArrowDownUp } from 'lucide-react';
import { SortOption } from '../../types/product';

interface ProductSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  totalResults: number;
}

export const ProductSearch: React.FC<ProductSearchProps> = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  totalResults,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
      {/* Search Input Box */}
      <div className="relative flex-1">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by product name, category, or features..."
          className="w-full pl-10 pr-9 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-aurora focus:border-aurora transition-colors"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
            aria-label="Clear search query"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Sort Select & Result Count */}
      <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
        <span className="text-xs text-slate-500 whitespace-nowrap hidden lg:inline">
          {totalResults} {totalResults === 1 ? 'item' : 'items'}
        </span>

        <div className="flex items-center gap-2">
          <label htmlFor="sort-dropdown" className="flex items-center gap-1.5 text-xs font-medium text-slate-600 shrink-0">
            <ArrowDownUp className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Sort:</span>
          </label>
          <select
            id="sort-dropdown"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="text-xs font-medium bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
          >
            <option value="featured">Featured Collection</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Highest Customer Rating</option>
            <option value="name-asc">Alphabetical (A - Z)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

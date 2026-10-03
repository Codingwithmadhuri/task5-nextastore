export type ProductCategory = 'Electronics' | 'Fashion' | 'Accessories' | 'Home';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number; // in INR
  originalPrice?: number; // in INR
  description: string;
  features?: string[];
  image: string;
  fallbackGradient?: string;
  rating: number; // sample data, 1.0 to 5.0
  reviewCount: number; // sample count
  stock: number;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  tags?: string[];
}

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  description: string;
  image: string;
  itemCount: number;
}

export type SortOption =
  | 'featured'
  | 'price-asc'
  | 'price-desc'
  | 'rating-desc'
  | 'name-asc';

export interface FilterState {
  searchQuery: string;
  category: ProductCategory | 'All';
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  minRating: number;
  sortBy: SortOption;
}

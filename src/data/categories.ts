import { CategoryInfo } from '../types/product';
import electronicsImg from '../assets/images/category_electronics_1791039316992.jpg';
import fashionImg from '../assets/images/category_fashion_1791039333239.jpg';
import accessoriesImg from '../assets/images/category_accessories_1791039344008.jpg';
import homeImg from '../assets/images/category_home_1791039353135.jpg';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'Electronics',
    name: 'Electronics & Audio',
    description: 'Precision audio, ergonomic peripherals, and everyday workspace gear.',
    image: electronicsImg,
    itemCount: 4,
  },
  {
    id: 'Fashion',
    name: 'Modern Apparel',
    description: 'Clean architectural silhouettes, sustainable fabrics, and minimalist tailoring.',
    image: fashionImg,
    itemCount: 4,
  },
  {
    id: 'Accessories',
    name: 'Curated Accessories',
    description: 'Everyday carry essentials, titanium analog timepieces, and hand-finished leather.',
    image: accessoriesImg,
    itemCount: 4,
  },
  {
    id: 'Home',
    name: 'Home & Living',
    description: 'Ceramic forms, warm natural lighting, and tactile living accents.',
    image: homeImg,
    itemCount: 4,
  },
];

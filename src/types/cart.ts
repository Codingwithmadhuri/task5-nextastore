import { Product } from './product';

export interface CartItem {
  product: Product;
  quantity: number;
  addedAt: number;
}

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  paymentMethod: 'cod' | 'upi_demo' | 'card_demo';
}

export interface OrderConfirmation {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  customer: CustomerDetails;
  placedAt: string;
  estimatedDelivery: string;
}

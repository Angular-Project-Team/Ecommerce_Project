export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  avatarUrl: string;
  address: UserAddress;
  createdAt: string;
}

export interface UserAddress {
  city: string;
  streetAddress: string;
  fullAddress: string;
  zipCode: string;
}

// Saved payment cards (for user profile)
export interface Payment {
  id: string;
  userId: string;
  cardType: 'visa' | 'mastercard' | 'amex';
  cardNumber: string;
  expiryDate: string;
  cardholderName: string;
  isDefault: boolean;
}

// Payment method types for checkout
export type PaymentMethodType = 'credit-card' | 'paypal' | 'cash-on-delivery';

// Checkout payment info
export interface CheckoutPayment {
  method: PaymentMethodType;
  // Credit card details (only when method is 'credit-card')
  cardDetails?: {
    cardNumber: string;
    cardholderName: string;
    ccv: string;
    expiryDate: string;
  };
  // PayPal email (only when method is 'paypal')
  paypalEmail?: string;
}

// Cart item
export interface CartItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  total: number;
}

// Order
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: PaymentMethodType;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: UserAddress;
  createdAt: string;
}

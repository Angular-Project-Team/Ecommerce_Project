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

export interface Payment {
  id: string;
  userId: string;
  cardType: 'visa' | 'mastercard' | 'amex';
  cardNumber: string;
  expiryDate: string;
  cardholderName: string;
  isDefault: boolean;
}

export type PaymentMethodType = 'credit-card' | 'paypal' | 'cash-on-delivery';

export interface CheckoutPayment {
  method: PaymentMethodType;
  cardDetails?: {
    cardNumber: string;
    cardholderName: string;
    ccv: string;
    expiryDate: string;
  };
  paypalEmail?: string;
}

export interface CartItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  total: number;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderTimelineStep {
  label: string;
  key: OrderStatus | 'confirmed' | 'ready';
  completed: boolean;
  active: boolean;
  cancelled: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: PaymentMethodType;
  status: OrderStatus;
  shippingAddress: UserAddress;
  createdAt: string;
  estimatedDeliveryDate: string;
  deliveredDate?: string;
  cancelledAt?: string;
}

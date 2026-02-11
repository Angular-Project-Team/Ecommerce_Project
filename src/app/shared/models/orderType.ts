import { CartItem } from './cartItem';

export type OrderType = {
  id: string;
  userId: number;
  cartId: string;
  status: 'processing' | 'delivered' | 'shipping';
  items?: CartItem[];
};

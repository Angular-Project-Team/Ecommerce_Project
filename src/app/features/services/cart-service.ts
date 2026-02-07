import { Injectable } from '@angular/core';

export interface CartItem {
  productId: number;
  color: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {

  cart: CartItem[] = [];

  getCart() {
    return this.cart;
  }

  addToCart(item: CartItem) {
    const existingItem = this.cart.find(
      p => p.productId === item.productId && p.color === item.color
    );

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.cart.push(item);
    }
  }

}

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

  private storageKey = 'cart_items';
  cart: CartItem[] = [];

  constructor() {
    this.loadFromStorage();
  }

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

    this.saveToStorage();
  }

  private loadFromStorage() {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as CartItem[];
      if (Array.isArray(parsed)) {
        this.cart = parsed;
      }
    } catch {
      this.cart = [];
    }
  }

  private saveToStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
  }
}

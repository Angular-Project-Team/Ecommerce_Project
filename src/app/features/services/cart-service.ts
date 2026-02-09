import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CartItem } from '../../shared/models/cartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private readonly base_URL = "http://localhost:3000/cart";
  cartCount = signal(0);

  constructor(private http: HttpClient) {}

  getCart() {
    return this.http.get<CartItem[]>(this.base_URL);
  }

  loadCount() {
    this.getCart().subscribe({
      next: (items) => {
        const unique = new Set(items.map((i) => `${i.productId}-${i.color}`));
        this.cartCount.set(unique.size);
      },
      error: () => this.cartCount.set(0),
    });
  }

  addToCart(item: CartItem) {
    const normalizedId = Number(item.productId);
    const normalizedItem: CartItem = {...item,productId: normalizedId,};

    return this.getCart().pipe(
      switchMap((items) => {
        const existingItem = items.find(p => p.productId === normalizedId && p.color === normalizedItem.color);

        if (existingItem && existingItem.id != null) {
          const updated: CartItem = {
            ...existingItem,
            quantity: existingItem.quantity + normalizedItem.quantity,
          };
          return this.http.put<CartItem>(`${this.base_URL}/${existingItem.id}`, updated);
        }

        return this.http.post<CartItem>(this.base_URL, normalizedItem);
      }),
      tap(() => this.loadCount())
    );
  }

  updateQuantity(productId: number, color: string, quantity: number) {
    const normalizedId = Number(productId);
    return this.getCart().pipe(
      switchMap((items) => {
        const existingItem = items.find(
          p => p.productId === normalizedId && p.color === color
        );

        if (!existingItem || existingItem.id == null) return of(null);

        if (quantity <= 0) {
          return this.http.delete(`${this.base_URL}/${existingItem.id}`);
        }

        const updated: CartItem = {
          ...existingItem,
          quantity,
        };
        return this.http.put<CartItem>(`${this.base_URL}/${existingItem.id}`, updated);
      }),
      tap(() => this.loadCount())
    );
  }

  removeItem(productId: number, color: string) {
    const normalizedId = Number(productId);
    return this.getCart().pipe(
      switchMap((items) => {
        const existingItem = items.find(
          p => p.productId === normalizedId && p.color === color
        );
        if (!existingItem || existingItem.id == null) return of(null);
        return this.http.delete(`${this.base_URL}/${existingItem.id}`);
      }),
      tap(() => this.loadCount())
    );
  }
}

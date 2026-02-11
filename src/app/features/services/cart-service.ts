import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, tap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { CartItem } from '../../shared/models/cartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private readonly base_URL = "http://localhost:3000/cart";
  cartCount = signal(0);
  private readonly cartIdKey = 'cartId';

  constructor(private http: HttpClient) {}

  private generateCartId() {
    return `cart-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }

  getCartId() {
    const existing = localStorage.getItem(this.cartIdKey);
    if (existing) return existing;
    const next = this.generateCartId();
    localStorage.setItem(this.cartIdKey, next);
    return next;
  }

  resetCartId() {
    const next = this.generateCartId();
    localStorage.setItem(this.cartIdKey, next);
    return next;
  }

  getCart() {
    const cartId = this.getCartId();
    return this.http.get<CartItem[]>(`${this.base_URL}?cartId=${cartId}`).pipe(
      switchMap((items) => {
        if (items.length) return of(items);
        return this.http.get<CartItem[]>(this.base_URL).pipe(
          switchMap((all) => {
            const legacy = all.filter((i) => !i.cartId);
            if (!legacy.length) return of([]);
            const updates = legacy
              .filter((i) => i.id != null)
              .map((i) => this.http.put<CartItem>(`${this.base_URL}/${i.id}`, { ...i, cartId }));
            if (!updates.length) return of(legacy.map((i) => ({ ...i, cartId })));
            return forkJoin(updates).pipe(
              map(() => legacy.map((i) => ({ ...i, cartId })))
            );
          })
        );
      })
    );
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
    const cartId = this.getCartId();
    const normalizedItem: CartItem = { ...item, cartId, productId: normalizedId };

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

  clearCart() {
    return this.getCart().pipe(
      switchMap((items) => {
        if (!items.length) return of(null);
        const deletes = items
          .filter((i) => i.id != null)
          .map((i) => this.http.delete(`${this.base_URL}/${i.id}`));
        return deletes.length ? forkJoin(deletes) : of(null);
      }),
      tap(() => {
        this.loadCount();
        this.resetCartId();
      })
    );
  }
}

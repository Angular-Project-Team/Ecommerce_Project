import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, signal } from '@angular/core';
import { CartService } from '../services/cart-service';
import { ProductService } from '../services/product-service';
import { CartItem } from '../../shared/models/cartItem';
import { ProductType } from '../../shared/models/productType';
import { CartViewItem } from '../../shared/models/cartViewItem';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
})
export class Cart implements OnInit {
  private cartItems = signal<CartItem[]>([]);
  private products = signal<ProductType[]>([]);

  items = computed<CartViewItem[]>(() =>
    this.cartItems()
      .map((item) => this.buildViewItem(item))
      .filter((item): item is CartViewItem => item !== null)
  );

  subtotal = computed(() =>
    this.items().reduce((sum, item) => sum + item.lineTotal, 0)
  );

  shipping = computed(() => (this.items().length ? 10 : 0));

  total = computed(() => this.subtotal() + this.shipping());

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.productService.allProducts().subscribe({
      next: (products) => this.products.set(products),
      error: (err) => console.error(err),
    });
    this.refresh();
  }

  refresh() {
    this.cartService.getCart().subscribe({
      next: (items) => this.cartItems.set(items),
      error: (err) => console.error(err),
    });
  }

  private buildViewItem(item: CartItem): CartViewItem | null {
    const product = this.products().find((p) => Number(p.id) === item.productId);
    if (!product) return null;

    const price = Number(product.price) || 0;
    return {
      productId: item.productId,
      name: product.name,
      image: product.image,
      price,
      color: item.color,
      quantity: item.quantity,
      lineTotal: price * item.quantity,
      key: `${item.productId}-${item.color}`,
    };
  }

  increase(item: CartViewItem) {
    this.cartService.updateQuantity(
      item.productId,
      item.color,
      item.quantity + 1
    ).subscribe({
      next: () => this.refresh(),
      error: (err) => console.error(err),
    });
  }

  decrease(item: CartViewItem) {
    this.cartService.updateQuantity(
      item.productId,
      item.color,
      item.quantity - 1
    ).subscribe({
      next: () => this.refresh(),
      error: (err) => console.error(err),
    });
  }

  remove(item: CartViewItem) {
    this.cartService.removeItem(item.productId, item.color).subscribe({
      next: () => this.refresh(),
      error: (err) => console.error(err),
    });
  }

  trackByKey(index: number, item: CartViewItem) {
    return item.key;
  }
}

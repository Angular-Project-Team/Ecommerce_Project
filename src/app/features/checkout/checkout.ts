import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, signal } from '@angular/core';
import { CartService } from '../services/cart-service';
import { ProductService } from '../services/product-service';
import { CartItem } from '../../shared/models/cartItem';
import { ProductType } from '../../shared/models/productType';
import { CartViewItem } from '../../shared/models/cartViewItem';
import { RelatedProducts } from '../../shared/components/related-products/related-products';
import { Router } from '@angular/router';
import { Popup } from './components/popup/popup';
import { OrderService } from '../services/order-service';
import { OrderType } from '../../shared/models/orderType';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule , Popup],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css'],
})
export class Checkout implements OnInit {
  private cartItems = signal<CartItem[]>([]);
  private products = signal<ProductType[]>([]);
  showPopup = false;

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
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router
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

  remove(item: CartViewItem) {
    this.cartService.removeItem(item.productId, item.color).subscribe({
      next: () => this.refresh(),
      error: (err) => console.error(err),
    });
  }

  trackByKey(index: number, item: CartViewItem) {
    return item.key;
  }

  confirmOrder() {
    if (!this.items().length) return;

    const order: OrderType = {
      id: `ord-${Date.now()}`,
      userId: 1,
      cartId: this.cartService.getCartId(),
      status: 'processing', 
      items: this.cartItems()
    };

    this.orderService.createOrder(order).pipe(
      switchMap(() => this.cartService.clearCart())
    ).subscribe({
      next: () => {
        console.log('Order confirmed and cart cleared');
       this.showPopup = true;
       this.refresh();
      },
      error: (err) => console.error(err),
    });
  }

  closePopup() {
    this.showPopup = false;
    this.router.navigate(['/home']);
  }
}

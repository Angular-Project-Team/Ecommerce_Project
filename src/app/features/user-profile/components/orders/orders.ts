import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../../core/services/order-service';
import { Order } from '../../../../core/models/user.model';
import { OrderItem } from './components/order-item/order-item';

@Component({
  standalone: true,
  selector: 'app-orders',
  imports: [CommonModule, OrderItem],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders implements OnInit {
  private orderService = inject(OrderService);

  orders = signal<Order[]>([]);
  loading = signal<boolean>(true);

  private userId = '1';

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading.set(true);
    this.orderService.getOrdersByUserId(this.userId).subscribe({
      next: (orders) => {
        this.orders.set(orders);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
        this.loading.set(false);
      },
    });
  }

  onCancelOrder(orderId: string): void {
    this.orderService.cancelOrder(orderId).subscribe({
      next: (updatedOrder) => {
        this.orders.update((orders) =>
          orders.map((o) => (o.id === orderId ? updatedOrder : o))
        );
      },
      error: (err) => {
        console.error('Error cancelling order:', err);
      },
    });
  }
}

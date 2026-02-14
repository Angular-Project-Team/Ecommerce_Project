import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderType } from '../../shared/models/orderType';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly base_URL = 'http://localhost:3000/orders';

  constructor(private http: HttpClient) {}

  createOrder(order: OrderType) {
    return this.http.post<OrderType>(this.base_URL, order);
  }
}

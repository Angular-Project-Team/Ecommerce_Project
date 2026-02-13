import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    private readonly BASE_URL = 'http://localhost:3000/orders';

    constructor(private http: HttpClient) { }

    getOrdersByUserId(userId: string): Observable<Order[]> {
        return this.http.get<Order[]>(`${this.BASE_URL}?userId=${userId}`);
    }

    getOrderById(id: string): Observable<Order> {
        return this.http.get<Order>(`${this.BASE_URL}/${id}`);
    }

    cancelOrder(id: string): Observable<Order> {
        return this.http.patch<Order>(`${this.BASE_URL}/${id}`, {
            status: 'cancelled',
            cancelledAt: new Date().toISOString(),
        });
    }
}

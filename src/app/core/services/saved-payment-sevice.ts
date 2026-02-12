import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payment } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class SavedPaymentService {
  constructor(private http:HttpClient) {}

  private BASE_URL:string = 'http://localhost:3000/payments';

    getSavedPayments(userId: string) {
        return this.http.get(`${this.BASE_URL}?userId=${userId}`);
    }

    addPayment(payment: Payment) {
        return this.http.post(this.BASE_URL, payment);
    }

    updatePayment(payment: Payment) {
        return this.http.put(`${this.BASE_URL}/${payment.id}`, payment);
    }

    deletePayment(paymentId: string) {
        return this.http.delete(`${this.BASE_URL}/${paymentId}`);
    }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Payment } from '../models/payment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = environment.backendUrl;

  constructor(private httpClient: HttpClient) {}

  public makePayment(payment: Payment, orderId: number): Observable<Payment> {
    return this.httpClient.post<Payment>(
      `${this.apiUrl}/api/payments/makePayment/order/${orderId}`,
      payment
    );
  }

  public getAllPayments(): Observable<Payment[]> {
    return this.httpClient.get<Payment[]>(`${this.apiUrl}/api/payments/all`);
  }

  public getTotalPayments(): Observable<number> {
    return this.httpClient.get<number>(
      `${this.apiUrl}/api/payments/total-payments`
    );
  }

  public getPaymentByUsername(username: string): Observable<Payment[]> {
    return this.httpClient.get<Payment[]>(
      `${this.apiUrl}/api/payments/all/customer/${username}`
    );
  }

  public updatePayment(
    payment: Payment,
    paymentId: number
  ): Observable<Payment> {
    return this.httpClient.put<Payment>(
      `${this.apiUrl}/api/payments/update/${paymentId}`,
      payment
    );
  }

  public findPayment(paymentId: number): Observable<Payment> {
    return this.httpClient.get<Payment>(
      `${this.apiUrl}/api/payments/${paymentId}`
    );
  }

  public deletePayment(paymentId: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.apiUrl}/api/payments/delete/${paymentId}`
    );
  }
}

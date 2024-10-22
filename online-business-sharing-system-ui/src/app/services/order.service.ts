import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Payment } from '../models/payment';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = environment.backendUrl;

  constructor(private httpClient: HttpClient) {}

  public makeOrder(
    order: Order,
    customerId: number,
    productId: number
  ): Observable<Order> {
    return this.httpClient.post<Order>(
      `${this.apiUrl}/api/orders/make-order/customer/${customerId}/product/${productId}`,
      order
    );
  }

  public getAllOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${this.apiUrl}/api/orders/all`);
  }

  public getTotalOrders(): Observable<number> {
    return this.httpClient.get<number>(
      `${this.apiUrl}/api/orders/total-orders`
    );
  }

  public getOrdersByUsername(username: string): Observable<Order[]> {
    return this.httpClient.get<Order[]>(
      `${this.apiUrl}/api/orders/all/customer/${username}`
    );
  }

  public updateOrder(order: Order, orderId: number): Observable<Order> {
    return this.httpClient.put<Order>(
      `${this.apiUrl}/api/orders/update/${orderId}`,
      order
    );
  }

  public replyOrder(order: Order, orderId: number): Observable<Order> {
    return this.httpClient.put<Order>(
      `${this.apiUrl}/api/orders/reply-order/${orderId}`,
      order
    );
  }

  public findOrder(orderId: number): Observable<Order> {
    return this.httpClient.get<Order>(`${this.apiUrl}/api/orders/${orderId}`);
  }

  public deleteOrder(orderId: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.apiUrl}/api/orders/delete/${orderId}`
    );
  }
}

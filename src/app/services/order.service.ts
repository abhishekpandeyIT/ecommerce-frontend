import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

interface Order {
  _id: string;
  items: Array<{
    product: any;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: string;
  shippingAddress: any;
  paymentMethod: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  createOrder(orderData: any): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, orderData);
  }

  getOrderById(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${orderId}`);
  }

  getUserOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/user/orders`);
  }

  cancelOrder(orderId: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${orderId}/cancel`, {});
  }

  getOrderStatuses(): string[] {
    return ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
  }
}
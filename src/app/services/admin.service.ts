import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  recentOrders: any[];
  revenueStats: {
    daily: number;
    weekly: number;
    monthly: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) {}

  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.apiUrl}/dashboard`);
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${userId}`);
  }

  updateUser(userId: string, userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${userId}`, userData);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${userId}`);
  }

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products`);
  }

  createProduct(productData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/products`, productData);
  }

  updateProduct(productId: string, productData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/products/${productId}`, productData);
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/products/${productId}`);
  }

  getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/orders`);
  }

  updateOrderStatus(orderId: string, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/orders/${orderId}/status`, { status });
  }

  getSalesReport(startDate: string, endDate: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/sales-report`, {
      params: { startDate, endDate }
    });
  }
}
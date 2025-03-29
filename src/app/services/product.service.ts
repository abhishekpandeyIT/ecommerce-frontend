import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Product, ProductFilter, PaginatedProducts } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getProducts(filter: ProductFilter): Observable<PaginatedProducts> {
    let params = new HttpParams();

    if (filter.category) params = params.append('category', filter.category);
    if (filter.minPrice) params = params.append('minPrice', filter.minPrice.toString());
    if (filter.maxPrice) params = params.append('maxPrice', filter.maxPrice.toString());
    if (filter.color) params = params.append('color', filter.color);
    if (filter.size) params = params.append('size', filter.size);
    if (filter.brand) params = params.append('brand', filter.brand);
    if (filter.sort) params = params.append('sort', filter.sort);
    if (filter.search) params = params.append('search', filter.search);
    if (filter.page) params = params.append('page', filter.page.toString());
    if (filter.limit) params = params.append('limit', filter.limit.toString());

    return this.http.get<PaginatedProducts>(this.apiUrl, { params });
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  getFeaturedProducts(limit: number = 4): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/featured`, {
      params: { limit: limit.toString() }
    });
  }

  getRelatedProducts(productId: string, limit: number = 4): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/${productId}/related`, {
      params: { limit: limit.toString() }
    });
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/categories`);
  }

  getSubCategories(category: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/categories/${category}/subcategories`);
  }

  getBrands(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/brands`);
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:5000/api/products/categories';

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<string[]>(this.apiUrl);
  }
}
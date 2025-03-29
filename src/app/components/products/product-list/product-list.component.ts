import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product, ProductFilter } from '../../../models/product.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  categories: string[] = [];
  selectedCategory: string = '';
  isLoading = true;
  error: string | null = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedCategory = params['category'] || '';
      this.loadProducts();
    });

    this.loadCategories();
  }

  loadProducts(): void {
    this.isLoading = true;
    const filter: ProductFilter = {
      category: this.selectedCategory,
      page: 1,
      limit: 12
    };

    this.productService.getProducts(filter).subscribe({
      next: (data) => {
        this.products = data.products;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err.message || 'Failed to load products';
        this.isLoading = false;
      }
    });
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (categories) => this.categories = categories,
      error: (err) => console.error('Failed to load categories:', err)
    });
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.loadProducts();
  }
}
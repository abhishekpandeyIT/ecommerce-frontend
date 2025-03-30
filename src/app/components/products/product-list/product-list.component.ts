import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product, ProductFilter } from '../../../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from '../../../Shared/shared.module';
import { ProductComponent } from '../product/product.component';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  imports: [SharedModule,ProductComponent]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];  // Initialize with empty array
  categories: string[] = [];
  selectedCategory: string | null = null;
  selectedSort: string = '';  // Initialize with empty string
  priceRange: [number, number] = [0, 1000];  // Initialize with default range
  isLoading = true;
  error: string | null = null;
  
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedCategory = params['category'] || '';
    });
    this.loadProducts();
    // this.loadCategories();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.error = null;
    
    const filter: ProductFilter = {
      category: this.selectedCategory ?? undefined,
      page: 1,
      limit: 12
    };

    this.productService.getProducts(filter).subscribe({
      next: (data) => {
        this.products = data.products;
        this.isLoading = false;
      },
      error: (error) => console.error('Error loading products', error)
    });
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (categories) => this.categories = categories,
      error: (error) => console.error('Error loading categories', error)
    });
  }

  applyFilters() {
    this.filteredProducts = this.products.filter(product => {
      return (
        (!this.selectedCategory || product.category === this.selectedCategory) &&
        (product.price >= this.priceRange[0] && product.price <= this.priceRange[1])
      );
    });
    this.applySort();
  }

  applySort() {
    if (this.selectedSort === 'price-low-high') {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if (this.selectedSort === 'price-high-low') {
      this.filteredProducts.sort((a, b) => b.price - a.price);
    } else if (this.selectedSort === 'rating') {
      this.filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
  }

  onSortChange(sortValue: string) {
    this.selectedSort = sortValue;
    this.applySort();
  }

  onCategoryChange(category: string | null) {
    this.selectedCategory = category;
    this.applyFilters();
  }

  onPriceChange() {
    this.applyFilters();
  }
}
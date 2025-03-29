import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'] // Changed to .scss
})
export class AdminDashboardComponent implements OnInit {
  stats: any;
  products: any[] = [];
  editingProduct: any = null;
  isLoading = false;

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadDashboard();
    this.loadProducts();
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  private showError(error: any): void {
    const message = error.error?.message || error.message || 'An error occurred';
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }

  loadDashboard(): void {
    this.isLoading = true;
    this.adminService.getDashboardStats().subscribe({
      next: (data) => {
        this.stats = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.showError(err);
        this.isLoading = false;
      }
    });
  }

  loadProducts(): void {
    this.isLoading = true;
    this.adminService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.isLoading = false;
      },
      error: (err) => {
        this.showError(err);
        this.isLoading = false;
      }
    });
  }

  editProduct(product: any): void {
    this.editingProduct = { ...product };
  }

  saveProduct(): void {
    if (!this.editingProduct) return;

    this.isLoading = true;
    const observable = this.editingProduct._id
      ? this.adminService.updateProduct(this.editingProduct._id, this.editingProduct)
      : this.adminService.createProduct(this.editingProduct);

    observable.subscribe({
      next: () => {
        this.showSuccess(`Product ${this.editingProduct._id ? 'updated' : 'created'} successfully`);
        this.editingProduct = null;
        this.loadProducts();
      },
      error: (err) => {
        this.showError(err);
        this.isLoading = false;
      }
    });
  }

  deleteProduct(id: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.isLoading = true;
      this.adminService.deleteProduct(id).subscribe({
        next: () => {
          this.showSuccess('Product deleted successfully');
          this.loadProducts();
        },
        error: (err) => {
          this.showError(err);
          this.isLoading = false;
        }
      });
    }
  }
}
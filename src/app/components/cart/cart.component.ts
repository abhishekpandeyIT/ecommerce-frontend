import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatSpinner } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatLabel } from '@angular/material/input';
import { TruncatePipe } from './truncate.pipe';

interface CartItem {
  product: Product;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  imports: [ReactiveFormsModule, MatCardModule,MatIcon,MatSpinner, CommonModule, MatLabel, TruncatePipe]
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  isLoading = false;
  couponCode = '';
  discount = 0;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartItems = this.cartService.items;
  }

  updateQuantity(item: CartItem, newQuantity: number): void {
    if (newQuantity < 1) return;
    this.cartService.updateQuantity(item.product._id, newQuantity);
    this.loadCart(); // Refresh cart data
  }

  removeItem(productId: string): void {
    this.cartService.removeFromCart(productId);
    this.loadCart(); // Refresh cart data
    this.snackBar.open('Item removed from cart', 'Close', { duration: 3000 });
  }

  applyCoupon(): void {
    if (!this.couponCode) return;
    
    const result = this.cartService.applyCoupon(this.couponCode);
    if (result.success) {
      this.discount = result.discount || 0;
      this.snackBar.open('Coupon applied successfully', 'Close', { duration: 3000 });
    } else {
      this.snackBar.open(result.message || 'Invalid coupon code', 'Close', { duration: 3000 });
    }
  }

  get subtotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + (item.product.price * item.quantity), 
      0
    );
  }

  get total(): number {
    return this.subtotal - this.discount;
  }

  checkout(): void {
    this.isLoading = true;
    const orderItems = this.cartItems.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price
    }));

    this.orderService.createOrder({ items: orderItems }).subscribe({
      next: (order) => {
        this.cartService.clearCart();
        this.snackBar.open('Order placed successfully', 'Close', { duration: 3000 });
        this.router.navigate(['/order-confirmation', order._id]);
      },
      error: (err) => {
        this.snackBar.open(
          err.error?.message || 'Checkout failed', 
          'Close', 
          { duration: 5000 }
        );
        this.isLoading = false;
      }
    });
  }
}
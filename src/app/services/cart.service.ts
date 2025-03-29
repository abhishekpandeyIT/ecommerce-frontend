import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor() {
    this.loadCart();
  }

  private loadCart(): void {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.cartSubject.next(this.cartItems);
    }
  }

  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.cartSubject.next(this.cartItems);
  }

  

  addToCart(product: Product, quantity: number = 1): void {
    const existingItem = this.cartItems.find(item => item.product._id === product._id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({ product, quantity });
    }
    
    this.saveCart();
  }

  removeFromCart(productId: string): void {
    this.cartItems = this.cartItems.filter(item => item.product._id !== productId);
    this.saveCart();
  }

  updateQuantity(productId: string, newQuantity: number): void {
    const item = this.cartItems.find(item => item.product._id === productId);
    if (item) {
      item.quantity = newQuantity;
      this.saveCart();
    }
  }

  clearCart(): void {
    this.cartItems = [];
    this.saveCart();
  }

  get items(): CartItem[] {
    return [...this.cartItems];
  }

  get itemCount(): number {
    return this.cartItems.reduce((count, item) => count + item.quantity, 0);
  }

  get totalPrice(): number {
    return this.cartItems.reduce(
      (total, item) => total + (item.product.price * item.quantity), 
      0
    );
  }

  applyCoupon(couponCode: string): { success: boolean, discount?: number, message?: string } {
    // Implement your coupon logic here
    // This is a mock implementation
    if (couponCode === 'DISCOUNT10') {
      return { success: true, discount: this.totalPrice * 0.1 };
    }
    return { success: false, message: 'Invalid coupon code' };
  }
}
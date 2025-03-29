import { Component } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductsComponent {
  quantity = 1;

  constructor(private cartService: CartService) {}

  addToCart(product: Product): void {
    this.cartService.addToCart(product, this.quantity);
    // Show success message or navigate to cart
  }

  incrementQuantity(): void {
    this.quantity++;
  }

  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
import { Component, Input } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Product } from '../../../models/product.model';
import { SharedModule } from '../../../Shared/shared.module';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  imports: [SharedModule]
})
export class ProductComponent {
  @Input() product!: Product;
  quantity = 1;

  constructor(private cartService: CartService) {}

  addToCart(product: Product): void {
    this.cartService.addToCart(product, this.quantity);
    // You can add a toast notification here
  }

  incrementQuantity(): void {
    this.quantity++;
  }

  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  zoomImage(): void {
    // Implement image zoom functionality
    console.log('Zoom image:', this.product.imageUrl);
  }

  quickView(): void {
    // Implement quick view modal
    console.log('Quick view:', this.product);
  }

  addToWishlist(): void {
    // Implement wishlist functionality
    console.log('Added to wishlist:', this.product);
  }

  addToCompare(): void {
    // Implement compare functionality
    console.log('Added to compare:', this.product);
  }
}
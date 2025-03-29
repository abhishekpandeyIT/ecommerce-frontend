import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: any;

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      country: ['', Validators.required],
      paymentMethod: ['creditCard', Validators.required],
      sameAsBilling: [false]
    });

    // Load saved user data if available
  }

  constructor(
    private fb: FormBuilder,
    public cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}


  onSubmit(): void {
    if (this.checkoutForm.invalid) return;
    
    const orderData = {
      items: this.cartService.items.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price
      })),
      shippingAddress: {
        firstName: this.checkoutForm.value.firstName,
        lastName: this.checkoutForm.value.lastName,
        address: this.checkoutForm.value.address,
        city: this.checkoutForm.value.city,
        zipCode: this.checkoutForm.value.zipCode,
        country: this.checkoutForm.value.country
      },
      paymentMethod: this.checkoutForm.value.paymentMethod
    };
    
    this.orderService.createOrder(orderData).subscribe({
      next: (order) => {
        this.cartService.clearCart();
        this.router.navigate(['/order-success', order._id]);
      },
      error: (err:any) => console.error('Order failed:', err)
    });
  }
}
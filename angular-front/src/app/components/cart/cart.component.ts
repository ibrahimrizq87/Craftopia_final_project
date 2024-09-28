import { Component, OnInit } from '@angular/core';
import { CartItemService } from '../../services/cart.service';
import { HttpErrorResponse } from '@angular/common/http';

import { UserService } from '../../services/user.service';
import {  Router,RouterModule } from '@angular/router';
import { CustomerHeaderComponent } from '../customer-header/customer-header.component';

interface CartItem {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    image: string; // Assuming this field exists in your product model
  };
  quantity: number;
}



@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
   CustomerHeaderComponent,
   RouterModule
],
providers: [UserService],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartItemService: CartItemService) {}

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems(): void {
    this.cartItemService.getCartItems().subscribe(
      (items: CartItem[]) => {
        this.cartItems = items;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching cart items:', error);
      }
    );
  }

  removeCartItem(cartItemId: number): void {
    this.cartItemService.removeCartItem(cartItemId).subscribe(
      () => {
        this.getCartItems(); // Refresh the cart items after removal
      },
      (error: HttpErrorResponse) => {
        console.error('Error removing cart item:', error);
      }
    );
  }

  calculateTotal(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }
}

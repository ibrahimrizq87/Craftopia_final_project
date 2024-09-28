import { Component, OnInit } from '@angular/core';
import { CartItemService } from '../services/cart-item.service'; 
import { HttpErrorResponse } from '@angular/common/http';

interface CartItem {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
  };
  quantity: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = []; 
  totalPrice: number = 0;

  constructor(private cartItemService: CartItemService) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  // Fetch all cart items
  loadCartItems(): void {
    this.cartItemService.getCartItems().subscribe(
      (data: CartItem[]) => {
        this.cartItems = data;
        this.calculateTotal();
      },
      (error: HttpErrorResponse) => {
        console.error('Error loading cart items:', error.message);
      }
    );
  }

  // Remove an item from the cart
  removeItem(cartItemId: number): void {
    this.cartItemService.removeCartItem(cartItemId).subscribe(
      () => {
        this.cartItems = this.cartItems.filter(item => item.id !== cartItemId);
        this.calculateTotal();
      },
      (error: HttpErrorResponse) => {
        console.error('Error removing cart item:', error.message);
      }
    );
  }

  // Update the quantity of an item
  updateQuantity(item: CartItem): void {
    this.cartItemService.updateCartItem(item.id, { quantity: item.quantity }).subscribe(
      () => {
        this.calculateTotal();
      },
      (error: HttpErrorResponse) => {
        console.error('Error updating cart item quantity:', error.message);
      }
    );
  }

  // Calculate the total price
  calculateTotal(): void {
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }
}

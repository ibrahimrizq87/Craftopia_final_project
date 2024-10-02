import { Component, OnInit } from '@angular/core';
import { CartItemService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
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
      (error) => {
        console.error('Error fetching cart items:', error);
      }
    );
  }

  increaseQuantity(item: CartItem): void {
    if (item.quantity < item.stock) {
      item.quantity++;
    }
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  removeCartItem(cartItemId: number): void {
    this.cartItemService.removeCartItem(cartItemId).subscribe(() => {
      this.cartItems = this.cartItems.filter(item => item.id !== cartItemId);
    });
  }

  calculateTotal(): number {
    return this.cartItems.reduce((total, item) => {
      const price = item?.product?.price ?? 0;
      return total + (price * item.quantity);
    }, 0);
  }
  

  placeOrder(): void {
    const orderData = {
      items: this.cartItems.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity
      })),
      total: this.calculateTotal()
    };

    this.cartItemService.placeOrder(orderData).subscribe(
      response => {
        console.log('Order placed successfully:', response);
        // Clear cart after order is placed
        this.cartItems = [];
      },
      error => {
        console.error('Error placing order:', error);
      }
    );
  }
}

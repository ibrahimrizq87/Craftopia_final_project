import { Component, OnInit } from '@angular/core';
import { CartItemService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.model';  // Import the CartItem model

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

  // Fetch cart items from the service
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

  // Increase the quantity of an item
  increaseQuantity(item: CartItem): void {
    if (item.quantity < item.stock) {
      item.quantity++;
    }
  }

  // Decrease the quantity of an item
  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  removeCartItem(cartItemId: number): void {
    // Call the service to remove the cart item from the back-end
    this.cartItemService.removeCartItem(cartItemId).subscribe(
      () => {
        // After successfully removing from the database, update the front-end
        this.cartItems = this.cartItems.filter(item => item.id !== cartItemId);
      },
      (error) => {
        console.error('Error deleting cart item:', error);  // Handle any errors
      }
    );
  }

  // Calculate the total price of all cart items
calculateTotal(): number {
  return this.cartItems.reduce((total, item) => {
    return total + ((item?.product?.price || 0) * item.quantity);
  }, 0);
}

}

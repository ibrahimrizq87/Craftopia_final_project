import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginAlertComponent } from '../login-alert/login-alert.component';
import { CartItemService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order',
  standalone: true,
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'] // Make sure this file exists
})
export class OrderComponent implements OnInit {
  user: any;
  cartItems: CartItem[] = [];
  orderData = {
    phone: '',
    address: '',
    total: 0,
    items: [] as { product_id: number; quantity: number; }[] // Explicitly define the type
  };

  constructor(
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog,
    private cartItemService: CartItemService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.checkUserAuthentication();
    this.getCartItems();
  }

  checkUserAuthentication(): void {
    console.log(sessionStorage.getItem('authToken'));
    if (sessionStorage.getItem('authToken')) {
      this.userService.getUser().subscribe(
        response => {
          this.user = response;
        },
        error => {
          this.handleAuthError(error);
        }
      );
    } else {
      this.router.navigate(['/login']);
    }
  }

  handleAuthError(error: any): void {
    if (error.status === 401) {
      sessionStorage.removeItem('authToken');
      sessionStorage.setItem('loginSession', 'true');
      this.router.navigate(['/login']);
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }

  getCartItems(): void {
    this.cartItemService.getCartItems().subscribe(
      (items: CartItem[]) => {
        this.cartItems = items;
        if (this.cartItems && this.cartItems.length > 0) {
          this.updateOrderTotal();
        }
      },
      error => {
        console.error('Error fetching cart items:', error);
      }
    );
  }

  updateOrderTotal(): void {
    this.orderData.total = this.cartItems.reduce((total, item) => {
      const price = item.product?.price || 0; // Safely access price
      const quantity = item.quantity || 0;     // Safely access quantity
      return total + (price * quantity);
    }, 0);
  }
    

  placeOrder(): void {
    // Prepare the order data
    this.orderData.items = this.cartItems.map(item => ({
      product_id: item.product_id,
      quantity: item.quantity
    }));

    // Call the order service to place the order
    this.orderService.placeOrder(this.orderData).subscribe(
      response => {
        console.log('Order placed successfully:', response);
        // Optionally, clear the cart or redirect
        this.cartItems = []; // Clear cart items after placing order
      },
      error => {
        console.error('Error placing order:', error);
      }
    );
  }

  openAlertDialogAsync() {
    setTimeout(() => {
      this.dialog.open(LoginAlertComponent, {
        data: {
          icon: 'Check',
          message: 'This Alert Dialog opened asynchronously'
        }
      });
    }, 200);
  }
}

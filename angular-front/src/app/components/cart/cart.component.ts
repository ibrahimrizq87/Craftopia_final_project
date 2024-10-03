import { ChangeDetectorRef, Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';
import { Router, RouterModule } from '@angular/router';
import { CustomerHeaderComponent } from '../customer-header/customer-header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CustomerHeaderComponent,
    RouterModule,
    CommonModule,
    FormsModule
  ],
  providers: [UserService],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  user: any;
  orderItems: any[] = [];

  constructor(
    private userService: UserService,
    private cartService: CartService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.checkAuthToken();
  }

  private checkAuthToken(): void {
    const authToken = sessionStorage.getItem('authToken');
    if (authToken) {
      this.getUser();
    } else {
      this.redirectToLogin();
    }
  }

  private getUser(): void {
    this.userService.getUser().subscribe(
      response => {
        this.user = response;
        this.getOrderItems();
      },
      error => {
        this.handleError(error);
      }
    );
  }

  private getOrderItems(): void {
    this.cartService.getAllItems().subscribe(
      (response: any) => {
        if (response && response.length > 0) {
          this.orderItems = response;
          console.log(this.orderItems);
        } else {
          console.log('Your cart is empty.');
        }
      },
      error => {
        console.error('Error fetching order items:', error);
      }
    );
  }

  increaseQuantity(item: any): void {
    item.quantity++;
    this.updateOrderItem(item);
  }

  decreaseQuantity(item: any): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateOrderItem(item);
    }
  }

  removeItem(item: any): void {
    this.cartService.deleteItem(item.id).subscribe(
      () => {
        this.orderItems = this.orderItems.filter(orderItem => orderItem.id !== item.id);
      },
      error => {
        console.error('Error removing item:', error);
      }
    );
  }

  calculateTotal(): number {
    return this.orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  private updateOrderItem(item: any): void {
    const updatedData = { quantity: item.quantity };
    this.cartService.updateItem(updatedData, item.id).subscribe(
      () => {
        console.log('Item updated successfully');
      },
      error => {
        console.error('Error updating item:', error);
      }
    );
  }

  processCheckout(): void {
    this.cartService.checkout().subscribe(
      () => {
        console.log('Order placed successfully');
        this.router.navigate(['/checkout']);
      },
      error => {
        console.error('Error during checkout:', error);
      }
    );
  }

  private redirectToLogin(): void {
    sessionStorage.setItem('loginSession', 'true');
    this.router.navigate(['/login']);
  }

  private handleError(error: any): void {
    if (error.status === 401) {
      sessionStorage.removeItem('authToken');
      this.redirectToLogin();
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }
}

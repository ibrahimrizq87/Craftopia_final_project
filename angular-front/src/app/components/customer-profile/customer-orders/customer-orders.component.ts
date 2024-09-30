import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-orders',
  standalone: true,
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.css'],
  imports: [CommonModule, RouterModule]
})
export class CustomerOrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    console.log('Component initialized'); 
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.orderService.getAllOrders().subscribe(
      (response) => {
        console.log('Fetched Orders:', response); 
        this.orders = response;
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }
  
  

  calculateTotalPrice(orderItems: any[]): number {
    return orderItems.reduce((total, item) => {
      const price = item.product?.price || 0; 
      return total + (price * (item.quantity || 0));
    }, 0);
  }
  

  viewOrder(orderId: string): void {
    this.router.navigate(['/order-details', orderId]);
  }

  editOrder(orderId: string): void {
    this.router.navigate(['/edit-order', orderId]);
  }

  cancelOrder(orderId: string): void {
    const order = this.orders.find(order => order.id === orderId);
    if (!order) {
      alert('Order not found!');
      return;
    }

    if (order.payment_status === 'canceled') {
      alert('This order is already canceled.');
      return;
    }

    if (order.payment_status === 'payed') {
      alert('This order has already been paid and cannot be canceled.');
      return;
    }

    this.orderService.cancelOrder(orderId).subscribe(
      () => {
        alert('Order canceled successfully!');
        this.fetchOrders();
      },
      (error) => {
        console.error('Error canceling order:', error);
        alert('Failed to cancel order: ' + (error.error.message || error.message));
      }
    );
  }}
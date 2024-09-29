import { Component, Input } from '@angular/core';
import { CustomerHeaderComponent } from "../../customer-header/customer-header.component";
import { RouterModule } from '@angular/router';
import { ListPartComponent } from '../../customer-profile/list-part/list-part.component';
import {OrderItem} from '../../../order_items'
// Define product interface


@Component({
  selector: 'app-view-order',
  standalone: true,
  imports: [CustomerHeaderComponent, ListPartComponent, RouterModule],
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css'] // Fixed typo from styleUrl to styleUrls
})
export class ViewOrderComponent {
  activeComponent: string = '';

  // Receive order object from parent component
  @Input() order: Order | undefined;

  // Calculate total price, for example, including tax or any other additions if required
  calculateTotalPrice(orderItems: OrderItem[] | undefined): number {
    if (!orderItems) return 0;
    const subtotal = this.calculateSubtotal(orderItems);
    const tax = subtotal * 0.1; // 10% tax for example
    return subtotal + tax;
  }

  // Calculate subtotal of the order items
  calculateSubtotal(orderItems: OrderItem[] | undefined): number {
    if (!orderItems) return 0;
    return orderItems.reduce((subtotal, item) => subtotal + (item.product.price * item.quantity), 0);
  }

  // Method to handle component visibility
  showComponent(component: string) {
    this.activeComponent = component;
  }
}

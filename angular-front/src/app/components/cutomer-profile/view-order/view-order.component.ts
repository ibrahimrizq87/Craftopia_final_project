import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../services/order.service';

import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { ListPartComponent } from '../../customer-profile/list-part/list-part.component';

@Component({
  selector: 'app-view-order',
  standalone: true,
  templateUrl: './view-order.component.html',
  imports: [CommonModule, ListPartComponent]
})
export class ViewOrderComponent implements OnInit {
  order: any = {}; 
  totalPrice: number = 0;
  products: any;

  constructor(private route: ActivatedRoute, private orderService: OrderService, private productService: ProductService) {}

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');

    if (orderId !== null) {
      this.orderService.getOrder(orderId).subscribe(data => {
        this.order = data;
        console.log(this.order); 
        this.calculateTotalPrice();
        
     
        this.productService.getProduct(orderId).subscribe((productsData: any) => {
          this.products = productsData;
          console.log(this.products);
        }, (error: any) => {
          console.error('Error fetching products:', error);
        });
      }, error => {
        console.error('Error fetching order:', error);
      });
    }
  }

  calculateTotalPrice(): void {
    if (this.order && this.order.orderItems) {
      this.totalPrice = this.order.orderItems.reduce((total: number, item: any) => {
        return total + (item.quantity * item.product.price);
      }, 0);
    } else {
      this.totalPrice = 0;
    }
  }
}

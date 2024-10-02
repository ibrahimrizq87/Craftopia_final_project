import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from '../models/cart-item.model'; // Adjust path as needed

@Injectable({
  providedIn: 'root'
})
export class CartItemService {
  private apiUrl = 'http://localhost:8000/api/cart'; // Replace with your actual URL
  private orderUrl = 'http://localhost:8000/api/orders'; // Add the order URL

  constructor(private http: HttpClient) {}

  // Fetch cart items
  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.apiUrl);
  }

  // Add item to cart
  addCartItem(productId: number, quantity: number): Observable<any> {
    return this.http.post(this.apiUrl, { product_id: productId, quantity });
  }

  // Remove cart item by ID
  removeCartItem(cartItemId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${cartItemId}`);
  }

  // Place order
  placeOrder(orderData: any): Observable<any> {
    return this.http.post(this.orderUrl, orderData);
  }
}

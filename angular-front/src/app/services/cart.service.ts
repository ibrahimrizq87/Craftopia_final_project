import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartItemService {
  private apiUrl = 'http://localhost:8000/cart'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  // Get cart items from the backend fetch
  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.apiUrl);
  }
   

    // Add item to cart
    addCartItem(productId: number, quantity: number): Observable<any> {
      return this.http.post(this.apiUrl, { product_id: productId, quantity });
    }

  // Remove cart item from the backend
  removeCartItem(cartItemId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${cartItemId}`);
  }
}

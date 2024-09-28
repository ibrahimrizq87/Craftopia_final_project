import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Ensures the service can be injected throughout the app
})
export class CartItemService {
  private apiUrl = '/api/cart-items'; // Adjust based on your API

  constructor(private http: HttpClient) {}

  getCartItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  removeCartItem(cartItemId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${cartItemId}`);
  }
}

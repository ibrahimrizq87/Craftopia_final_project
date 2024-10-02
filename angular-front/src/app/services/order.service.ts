import { Injectable } from '@angular/core';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment'; 


@Injectable({
  providedIn: 'root'
})
export class OrderService {
    // private apiUrl = 'http://0.0.0.0:8000/api/orders'; 
    private apiUrl = environment.apiUrl+'/orders';


    constructor(private http: HttpClient) {}

    // Define the placeOrder method
    placeOrder(orderData: { phone: string; address: string; total: number; items: { product_id: number; quantity: number; }[] }): Observable<any> {
      return this.http.post(`${this.apiUrl}/orders`, orderData);
    }

    getOrder(id: string): Observable<any> {
        const authToken = sessionStorage.getItem('authToken');

        const headers = new HttpHeaders({
          'Authorization': `Bearer ${authToken}`
        });
        return this.http.get(`${this.apiUrl}/${id}`, { headers });
    }


    getAllOrders(): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });
      return this.http.get(this.apiUrl, { headers });
    }

    deleteOrder(id: string): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });

      return this.http.delete(`${this.apiUrl}/${id}`, { headers });
    }


   
    addOrder(orderData: any): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });

      return this.http.post(this.apiUrl,orderData, { headers });
    }

    updateOrder(orderData: any , id: string): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });

      return this.http.patch(`${this.apiUrl}/${id}`,orderData, { headers });
    }

}




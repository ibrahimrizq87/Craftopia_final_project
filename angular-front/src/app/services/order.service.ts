// services/order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  

    private apiUrl = `${environment.apiUrl}/orders`;

    constructor(private http: HttpClient) { }

    getOrder(id: string): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });
      return this.http.get(`${this.apiUrl}/${id}`, { headers });
    }

    getAllOrders(): Observable<any[]> {
        const authToken = sessionStorage.getItem('authToken');
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${authToken}`
        });
        return this.http.get<any[]>(this.apiUrl, { headers });
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
        return this.http.post<any>(this.apiUrl, orderData, { headers });     
    }

    updateOrder(orderData: any, id: string): Observable<any> {
        const authToken = sessionStorage.getItem('authToken');
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${authToken}`
        });
        return this.http.patch<any>(`${this.apiUrl}/${id}`, orderData, { headers });
    }

    cancelOrder(id: string): Observable<any> {
      const authToken = sessionStorage.getItem('authToken');
      const headers = new HttpHeaders({
          'Authorization': `Bearer ${authToken}`
      });
      return this.http.patch<any>(`${this.apiUrl}/${id}`, { payment_status: 'canceled' }, { headers });
    }
}

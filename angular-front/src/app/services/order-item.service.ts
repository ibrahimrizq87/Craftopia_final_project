// services/order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {
    private apiUrl = `${environment.apiUrl}/order-items`;

    constructor(private http: HttpClient) { }
    private currentOrderItem: any;

    setCurrentOrderItem(order: any) {
      this.currentOrderItem = order;

    }
  
    getCurrentOrderItem() {
      return this.currentOrderItem;
    }


    getOrderItem(id: string): Observable<any> {
        const authToken = sessionStorage.getItem('authToken');
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${authToken}`
        });
        return this.http.get<any>(`${this.apiUrl}/${id}`, { headers });
    }

    
    getAllOrderItems(order_id:string): Observable<any> {
        const authToken = sessionStorage.getItem('authToken');
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${authToken}`
        });
        return this.http.get(`${this.apiUrl}/my-items/${order_id}`, { headers });
    }
    getAllMyOrderItems(): Observable<any> {
        const authToken = sessionStorage.getItem('authToken');
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${authToken}`
        });
        return this.http.get(`${this.apiUrl}/seller-orders`, { headers });
    }

    
    craftOrderItem(id:string): Observable<any> {
        const authToken = sessionStorage.getItem('authToken');
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${authToken}`
        });
        return this.http.get(`${this.apiUrl}/craft-order/${id}`, { headers });
    }


    serveOrderItem(id:string): Observable<any> {
        const authToken = sessionStorage.getItem('authToken');
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${authToken}`
        });
        return this.http.get(`${this.apiUrl}/serve-order/${id}`, { headers });
    }

    deleteOrderItem(id: string): Observable<any> {
        const authToken = sessionStorage.getItem('authToken');
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${authToken}`
        });
        return this.http.delete(`${this.apiUrl}/${id}`, { headers });
    }

    addOrderItem(orderData: any): Observable<any> {
        const authToken = sessionStorage.getItem('authToken');
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${authToken}`
        });  
        return this.http.post(this.apiUrl, orderData, { headers });     
    }

    updateOrderItem(orderData: any, id: string): Observable<any> {
        const authToken = sessionStorage.getItem('authToken');
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${authToken}`
        });
        return this.http.patch(`${this.apiUrl}/${id}`, orderData, { headers });
    }


}

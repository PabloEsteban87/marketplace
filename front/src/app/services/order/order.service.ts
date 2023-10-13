import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../../models/Order';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl: string = 'http://localhost:8000/orders'; 

  constructor(private http: HttpClient) { }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}`);
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/${id}`);
  }

  getOrdersByEmail(email: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/customer/${email}`);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}`, order);
  }

  createOrderComic(order: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}`, order);
  }

}

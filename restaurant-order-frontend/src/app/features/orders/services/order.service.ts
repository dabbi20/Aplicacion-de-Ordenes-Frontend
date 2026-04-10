import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateOrderRequest } from '../models/create-order-request.model';
import { OrderResponse, OrderStatus } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8081/api/orders';

  createOrder(request: CreateOrderRequest): Observable<OrderResponse> {
    return this.http.post<OrderResponse>(this.apiUrl, request);
  }

  getAllOrders(): Observable<OrderResponse[]> {
    return this.http.get<OrderResponse[]>(this.apiUrl);
  }

  getOrderById(id: number): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(`${this.apiUrl}/${id}`);
  }

  updateOrderStatus(id: number, status: OrderStatus): Observable<OrderResponse> {
    return this.http.patch<OrderResponse>(`${this.apiUrl}/${id}/status`, { status });
  }
}
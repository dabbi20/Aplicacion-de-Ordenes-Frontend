import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateOrderRequest } from '../models/create-order-request.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8081/api/orders';

  createOrder(request: CreateOrderRequest): Observable<any> {
    return this.http.post<any>(this.baseUrl, request);
  }
}
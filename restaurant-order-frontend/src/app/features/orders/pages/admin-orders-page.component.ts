import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { OrderResponse, OrderStatus } from '../models/order.model';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-admin-orders-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `...`
})
export class AdminOrdersPageComponent implements OnInit {
  private readonly orderService = inject(OrderService);

  orders: OrderResponse[] = [];
  isLoading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.orderService.getAllOrders()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (response: OrderResponse[]) => {
          this.orders = response ?? [];
        },
        error: (error: any) => {
          console.error('Error loading admin orders:', error);
          this.errorMessage =
            error?.error?.message ||
            `No se pudieron cargar las órdenes. Status: ${error?.status ?? 'desconocido'}`;
        }
      });
  }

  changeStatus(orderId: number, status: OrderStatus): void {
    this.orderService.updateOrderStatus(orderId, status).subscribe({
      next: (updatedOrder: OrderResponse) => {
        this.orders = this.orders.map(order =>
          order.orderId === updatedOrder.orderId ? updatedOrder : order
        );
      },
      error: (error: any) => {
        console.error('Error updating order status:', error);
        this.errorMessage =
          error?.error?.message ||
          `No se pudo actualizar el estado. Status: ${error?.status ?? 'desconocido'}`;
      }
    });
  }

  getStatusClasses(status: OrderStatus): string {
    switch (status) {
      case 'CREATED':
        return 'bg-blue-100 text-blue-700';
      case 'PREPARING':
        return 'bg-amber-100 text-amber-700';
      case 'DELIVERED':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  }
}
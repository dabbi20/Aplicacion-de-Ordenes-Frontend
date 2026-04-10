import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderResponse, OrderStatus } from '../models/order.model';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="mx-auto max-w-7xl px-6 py-8">
      <div class="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 class="text-3xl font-bold text-slate-800">Órdenes</h1>
          <p class="text-slate-500">
            Panel administrativo para visualizar y gestionar pedidos.
          </p>
        </div>

        <button
          type="button"
          (click)="loadOrders()"
          class="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Recargar
        </button>
      </div>

      <div *ngIf="errorMessage" class="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
        {{ errorMessage }}
      </div>

      <div *ngIf="isLoading" class="rounded-2xl bg-white p-8 text-center shadow-sm">
        <p class="text-slate-600">Cargando órdenes...</p>
      </div>

      <div *ngIf="!isLoading && orders.length === 0" class="rounded-2xl bg-white p-8 text-center shadow-sm">
        <p class="text-slate-600">No hay órdenes registradas todavía.</p>
      </div>

      <div *ngIf="!isLoading && orders.length > 0" class="space-y-6">
        <div
          *ngFor="let order of orders"
          class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div class="border-b border-slate-200 px-6 py-4">
            <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div class="grid gap-2 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                <div>
                  <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Orden</p>
                  <p class="text-sm font-bold text-slate-800">#{{ order.orderId }}</p>
                </div>

                <div>
                  <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Cliente</p>
                  <p class="text-sm font-medium text-slate-800">
                    {{ order.userName || ('Usuario #' + order.userId) }}
                  </p>
                </div>

                <div>
                  <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Pago</p>
                  <p class="text-sm font-medium text-slate-800">{{ order.paymentType }}</p>
                </div>

                <div>
                  <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Fecha</p>
                  <p class="text-sm font-medium text-slate-800">
                    {{ order.createdAt ? (order.createdAt | date:'short') : 'Sin fecha' }}
                  </p>
                </div>
              </div>

              <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
                <span
                  class="inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold"
                  [ngClass]="getStatusClasses(order.status)"
                >
                  {{ order.status }}
                </span>

                <div class="min-w-[180px]">
                  <label class="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Cambiar estado
                  </label>

                  <select
                    class="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                    [ngModel]="order.status"
                    (ngModelChange)="changeStatus(order.orderId, $event)"
                  >
                    <option value="CREATED">CREATED</option>
                    <option value="PREPARING">PREPARING</option>
                    <option value="DELIVERED">DELIVERED</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div class="px-6 py-5">
            <div class="overflow-x-auto">
              <table class="min-w-full text-sm">
                <thead>
                  <tr class="border-b border-slate-200 text-left text-slate-500">
                    <th class="pb-3 font-semibold">Producto</th>
                    <th class="pb-3 font-semibold">Cantidad</th>
                    <th class="pb-3 font-semibold">Precio unitario</th>
                    <th class="pb-3 font-semibold">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let item of order.items" class="border-b border-slate-100 last:border-b-0">
                    <td class="py-3 font-medium text-slate-800">{{ item.productName }}</td>
                    <td class="py-3 text-slate-600">{{ item.quantity }}</td>
                    <td class="py-3 text-slate-600">$ {{ item.unitPrice }}</td>
                    <td class="py-3 text-slate-800">$ {{ item.subtotal }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="mt-5 flex flex-col gap-2 border-t border-slate-200 pt-4 sm:ml-auto sm:max-w-xs">
              <div class="flex items-center justify-between text-sm text-slate-600">
                <span>Subtotal</span>
                <span>$ {{ order.subtotal }}</span>
              </div>

              <div class="flex items-center justify-between text-sm text-slate-600">
                <span>Impuesto</span>
                <span>$ {{ order.tax }}</span>
              </div>

              <div class="flex items-center justify-between text-base font-bold text-slate-900">
                <span>Total</span>
                <span>$ {{ order.total }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class OrdersPageComponent implements OnInit {
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

    this.orderService.getAllOrders().subscribe({
      next: (response) => {
        this.orders = response;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading orders:', error);
        this.errorMessage = error?.error?.message || 'No se pudieron cargar las órdenes';
        this.isLoading = false;
      }
    });
  }

  changeStatus(orderId: number, status: OrderStatus): void {
    this.orderService.updateOrderStatus(orderId, status).subscribe({
      next: (updatedOrder) => {
        this.orders = this.orders.map(order =>
          order.orderId === updatedOrder.orderId ? updatedOrder : order
        );
      },
      error: (error) => {
        console.error('Error updating order status:', error);
        this.errorMessage = error?.error?.message || 'No se pudo actualizar el estado de la orden';
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
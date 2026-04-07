import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CartItem, CartService } from '../service/cart.service';
import { OrderService } from '../../orders/services/order.service';
import { CreateOrderRequest } from '../../orders/models/create-order-request.model';
import { ModalService } from '../../../shared/components/modal/modal.service';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="mx-auto max-w-7xl px-6 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-slate-800">Carrito</h1>
        <p class="text-slate-500">Revisa tu pedido antes de confirmar la compra.</p>
      </div>

      <div *ngIf="errorMessage" class="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
        {{ errorMessage }}
      </div>

      <div *ngIf="cartItems.length === 0" class="rounded-2xl bg-white p-10 text-center shadow-sm">
        <h2 class="text-xl font-semibold text-slate-800">Tu carrito está vacío</h2>
        <p class="mt-2 text-slate-500">Agrega productos desde el catálogo para continuar.</p>

        <button
          type="button"
          (click)="goToProducts()"
          class="mt-6 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Ir a productos
        </button>
      </div>

      <div *ngIf="cartItems.length > 0" class="grid gap-8 lg:grid-cols-[1.5fr_0.9fr]">
        <div class="space-y-4">
          <div
            *ngFor="let item of cartItems"
            class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div class="flex flex-col gap-4 sm:flex-row">
              <img
                [src]="item.imageUrl || 'https://placehold.co/240x180?text=Sin+Imagen'"
                [alt]="item.name"
                class="h-28 w-full rounded-xl object-cover sm:w-36"
              />

              <div class="flex flex-1 flex-col justify-between gap-4">
                <div>
                  <div class="flex items-start justify-between gap-4">
                    <div>
                      <h3 class="text-lg font-bold text-slate-800">{{ item.name }}</h3>
                      <p class="mt-1 text-sm text-slate-500">Producto agregado al pedido.</p>
                    </div>

                    <p class="text-base font-semibold text-slate-800">$ {{ item.price }}</p>
                  </div>
                </div>

                <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div class="flex items-center gap-2">
                    <button
                      type="button"
                      (click)="decreaseQuantity(item.productId)"
                      class="rounded-lg bg-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-300"
                    >
                      -
                    </button>

                    <span class="min-w-[32px] text-center text-sm font-semibold text-slate-800">
                      {{ item.quantity }}
                    </span>

                    <button
                      type="button"
                      (click)="increaseQuantity(item.productId)"
                      class="rounded-lg bg-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-300"
                    >
                      +
                    </button>
                  </div>

                  <div class="flex items-center justify-between gap-4">
                    <p class="text-sm font-medium text-slate-600">
                      Subtotal: <span class="font-bold text-slate-800">$ {{ item.price * item.quantity }}</span>
                    </p>

                    <button
                      type="button"
                      (click)="removeFromCart(item.productId)"
                      class="rounded-lg bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-200"
                    >
                      Quitar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside class="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 class="text-xl font-bold text-slate-800">Resumen del pedido</h2>

          <div class="mt-6 space-y-3 border-b border-slate-200 pb-5">
            <div class="flex items-center justify-between text-sm text-slate-600">
              <span>Productos</span>
              <span>{{ getCartCount() }}</span>
            </div>

            <div class="flex items-center justify-between text-sm text-slate-600">
              <span>Subtotal</span>
              <span>$ {{ getCartSubtotal() }}</span>
            </div>

            <div class="flex items-center justify-between text-sm text-slate-600">
              <span>Impuesto estimado</span>
              <span>$ {{ getEstimatedTax() }}</span>
            </div>
          </div>

          <div class="mt-5 flex items-center justify-between text-lg font-bold text-slate-900">
            <span>Total estimado</span>
            <span>$ {{ getEstimatedTotal() }}</span>
          </div>

          <div class="mt-6">
            <label class="mb-2 block text-sm font-medium text-slate-700">
              Método de pago
            </label>

            <select
              [(ngModel)]="selectedPaymentType"
              class="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
            >
              <option value="CASH">Efectivo</option>
              <option value="CARD">Tarjeta</option>
              <option value="TRANSFER">Transferencia</option>
            </select>
          </div>

          <div class="mt-6 grid gap-3">
            <button
              type="button"
              (click)="checkout()"
              class="rounded-xl bg-green-600 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              Confirmar compra
            </button>

            <button
              type="button"
              (click)="clearCart()"
              class="rounded-xl border border-slate-300 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Vaciar carrito
            </button>

            <button
              type="button"
              (click)="goToProducts()"
              class="rounded-xl border border-slate-300 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Seguir comprando
            </button>
          </div>
        </aside>
      </div>
    </section>
  `
})
export class CartPageComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly orderService = inject(OrderService);
  private readonly modalService = inject(ModalService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  cartItems: CartItem[] = [];
  errorMessage = '';

  selectedPaymentType: 'CASH' | 'CARD' | 'TRANSFER' = 'CASH';

  ngOnInit(): void {
    this.cartService.items$.subscribe((items: CartItem[]) => {
      this.cartItems = items;
      this.cdr.detectChanges();
    });
  }

  getCartCount(): number {
    return this.cartService.getCount();
  }

  getCartSubtotal(): number {
    return this.cartService.getSubtotal();
  }

  getEstimatedTax(): number {
    const subtotal = this.getCartSubtotal();
    return Number((subtotal * 0.19).toFixed(2));
  }

  getEstimatedTotal(): number {
    return Number((this.getCartSubtotal() + this.getEstimatedTax()).toFixed(2));
  }

  increaseQuantity(productId: number): void {
    this.cartService.increaseQuantity(productId);
  }

  decreaseQuantity(productId: number): void {
    this.cartService.decreaseQuantity(productId);
  }

  removeFromCart(productId: number): void {
    this.modalService.open({
      title: 'Quitar producto',
      message: '¿Seguro que deseas quitar este producto del carrito?',
      type: 'confirm',
      confirmText: 'Quitar',
      cancelText: 'Cancelar',
      onConfirm: () => {
        this.cartService.removeFromCart(productId);
      }
    });
  }

  clearCart(): void {
    if (this.cartItems.length === 0) {
      return;
    }

    this.modalService.open({
      title: 'Vaciar carrito',
      message: '¿Seguro que deseas vaciar todo el carrito?',
      type: 'confirm',
      confirmText: 'Vaciar',
      cancelText: 'Cancelar',
      onConfirm: () => {
        this.cartService.clearCart();
      }
    });
  }

  checkout(): void {
    if (this.cartItems.length === 0) {
      this.errorMessage = 'El carrito está vacío';
      this.cdr.detectChanges();
      return;
    }

    const request: CreateOrderRequest = {
      userId: 1,
      paymentType: this.selectedPaymentType,
      items: this.cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }))
    };

    this.orderService.createOrder(request).subscribe({
      next: () => {
        this.errorMessage = '';
        this.cartService.clearCart();

        this.modalService.open({
          title: 'Orden creada',
          message: 'Tu pedido fue procesado correctamente.',
          type: 'success',
          confirmText: 'Aceptar'
        });

        this.router.navigate(['/products']);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error creating order:', error);
        this.errorMessage =
          error?.error?.message || 'No se pudo crear la orden';
        this.cdr.detectChanges();
      }
    });
  }

  goToProducts(): void {
    this.router.navigate(['/products']);
  }
}
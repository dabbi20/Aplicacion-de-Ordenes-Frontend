import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="border-t border-slate-200 bg-white">
      <div class="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
        
        <div>
          <h3 class="text-lg font-bold text-slate-900">Restaurant Orders</h3>
          <p class="mt-3 text-sm leading-6 text-slate-600">
            Plataforma de pedidos con panel administrativo, control de productos y experiencia de compra moderna.
          </p>
        </div>

        <div>
          <h4 class="text-sm font-semibold uppercase tracking-wide text-slate-800">Módulos</h4>
          <ul class="mt-3 space-y-2 text-sm text-slate-600">
            <li>Autenticación JWT</li>
            <li>Gestión de productos</li>
            <li>Carrito de compras</li>
            <li>Checkout y órdenes</li>
          </ul>
        </div>

        <div>
          <h4 class="text-sm font-semibold uppercase tracking-wide text-slate-800">Estado del sistema</h4>
          <ul class="mt-3 space-y-2 text-sm text-slate-600">
            <li>Roles: ADMIN / CLIENT</li>
            <li>Arquitectura por capas</li>
            <li>Frontend modular por features</li>
            <li>Angular + Spring Boot</li>
          </ul>
        </div>
      </div>

      <div class="border-t border-slate-200">
        <div class="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-sm text-slate-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>© 2026 Restaurant Orders. Todos los derechos reservados.</p>
          <p>Construido con Angular Standalone + Spring Boot + JWT</p>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}
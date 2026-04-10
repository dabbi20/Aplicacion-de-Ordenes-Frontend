import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="mt-16 border-t border-slate-200 bg-white">
      <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p class="text-sm font-semibold text-slate-900">Restaurant Order System</p>
            <p class="text-sm text-slate-500">
              Plataforma de pedidos con Angular + Spring Boot
            </p>
          </div>

          <div class="text-sm text-slate-500">
            © 2026 Restaurant Order. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}
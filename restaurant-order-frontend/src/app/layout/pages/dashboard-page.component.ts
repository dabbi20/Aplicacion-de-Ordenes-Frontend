import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../core/services/session.service';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  template: `
    <div class="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div class="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl text-center">
        <h1 class="text-3xl font-bold text-slate-800">Dashboard</h1>
        <p class="mt-2 text-slate-500">Sesión iniciada correctamente</p>

        <button
          type="button"
          (click)="logout()"
          class="mt-6 w-full rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  `
})
export class DashboardPageComponent {
  private sessionService = inject(SessionService);
  private router = inject(Router);

  logout(): void {
    this.sessionService.logout();
    this.router.navigate(['/login']);
  }
}
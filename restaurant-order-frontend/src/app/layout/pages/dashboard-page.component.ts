import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  template: `
    <div class="min-h-screen flex items-center justify-center bg-slate-100">
      <div class="bg-white p-8 rounded-2xl shadow-xl text-center">
        <h1 class="text-3xl font-bold text-slate-800">Dashboard</h1>
        <p class="text-slate-500 mt-2">Login exitoso</p>
      </div>
    </div>
  `
})
export class DashboardPageComponent {}
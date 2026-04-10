import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/NavbarComponent/navbar.component';
import { FooterComponent } from './components/FooterComponent/footer.component';
import { ModalComponent } from '../shared/components/modal/modal.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    ModalComponent
  ],
  template: `
    <div class="min-h-screen bg-slate-50 text-slate-900">
      <app-navbar></app-navbar>

      <main class="mx-auto min-h-[calc(100vh-160px)] max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <router-outlet></router-outlet>
      </main>

      <app-footer></app-footer>
      <app-modal></app-modal>
    </div>
  `
})
export class AppLayoutComponent {}
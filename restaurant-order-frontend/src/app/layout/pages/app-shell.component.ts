import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../components/NavbarComponent/navbar.component';
import { FooterComponent } from '../components/FooterComponent/footer.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <div class="flex min-h-screen flex-col bg-slate-50">
      <app-navbar></app-navbar>

      <main class="flex-1">
        <router-outlet></router-outlet>
      </main>

      <app-footer></app-footer>
    </div>
  `
})
export class AppShellComponent {}
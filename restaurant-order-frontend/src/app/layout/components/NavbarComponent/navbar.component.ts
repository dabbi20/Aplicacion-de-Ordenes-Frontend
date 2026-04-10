import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../../features/cart/service/cart.service';
import { SessionService } from '../../../core/services/session.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  private readonly cartService = inject(CartService);
  private readonly sessionService = inject(SessionService);
  private readonly router = inject(Router);

  readonly cartCount = computed(() => this.cartService.getCartCount());
  readonly username = computed(() => this.sessionService.getUsername() || 'Usuario');
  readonly role = computed(() => this.sessionService.getRole() || 'CLIENT');

  isAuthenticated(): boolean {
    return this.sessionService.isLoggedIn();
  }

  isAdmin(): boolean {
    return this.sessionService.isAdmin();
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }

  logout(): void {
    this.sessionService.logout();
    this.router.navigate(['/login']);
  }
}
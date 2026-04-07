import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
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
  private readonly router = inject(Router);
  private readonly cartService = inject(CartService);
  private readonly sessionService = inject(SessionService);

  mobileMenuOpen = signal(false);

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(value => !value);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }

  goToCartFromMobile(): void {
    this.closeMobileMenu();
    this.router.navigate(['/cart']);
  }

  logout(): void {
    this.sessionService.logout();
    this.closeMobileMenu();
    this.router.navigate(['/login']);
  }

  get cartCount(): number {
    return this.cartService.getCount();
  }

  get isLoggedIn(): boolean {
    return this.sessionService.isLoggedIn();
  }

  get username(): string {
    return this.sessionService.getUsername() || 'Usuario';
  }

  get roleLabel(): string {
    return this.sessionService.getRole() || 'CLIENT';
  }

  get isAdmin(): boolean {
    return this.sessionService.isAdmin();
  }
}
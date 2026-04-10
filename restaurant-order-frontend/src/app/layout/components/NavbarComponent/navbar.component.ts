import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { CartService } from '../../../features/cart/service/cart.service';
import { SessionService } from '../../../core/services/session.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit, OnDestroy {
  private readonly cartService = inject(CartService);
  private readonly sessionService = inject(SessionService);
  private readonly router = inject(Router);
  private readonly destroy$ = new Subject<void>();

  cartCount = 0;
  username = 'Usuario';
  role = 'CLIENT';

  ngOnInit(): void {
    this.cartService.cartItems$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.cartCount = this.cartService.getCartCount();
      });

    this.username = this.sessionService.getUsername() || 'Usuario';
    this.role = this.sessionService.getRole() || 'CLIENT';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

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
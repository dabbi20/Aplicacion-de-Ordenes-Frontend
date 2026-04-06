import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { ProductService } from '../service/product.service';
import { Product } from '../models/product.model';
import { SessionService } from '../../../core/services/session.service';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './products-page.component.html'
})
export class ProductsPageComponent implements OnInit {
  private productService = inject(ProductService);
  private sessionService = inject(SessionService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  products: Product[] = [];
  isLoading = false;
  errorMessage = '';

  ngOnInit(): void {
  console.log('TOKEN:', this.sessionService.getToken());
  console.log('ROLE ACTUAL:', this.sessionService.getRole());

  const token = this.sessionService.getToken();
  if (token) {
    console.log('PAYLOAD JWT:', JSON.parse(atob(token.split('.')[1])));
  }

  this.loadProducts();
}

  loadProducts(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.productService.getProducts().subscribe({
      next: (response) => {
        console.log('Productos cargados:', response);
        this.products = response;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.errorMessage =
          error?.error?.message || 'No se pudieron cargar los productos';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  isAdmin(): boolean {
    return this.sessionService.isAdmin();
  }

  editProduct(id: number): void {
    this.router.navigate(['/products/edit', id]);
  }

  logout(): void {
    this.sessionService.logout();
    this.router.navigate(['/login']);
  }
}
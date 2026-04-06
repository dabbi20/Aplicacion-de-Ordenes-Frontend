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

  getRole(): string {
    return this.sessionService.getRole() ?? 'SIN ROL';
  }

  editProduct(id: number): void {
    this.router.navigate(['/products/edit', id]);
  }

  deleteProduct(id: number): void {
    const confirmed = window.confirm('¿Seguro que deseas eliminar este producto?');

    if (!confirmed) {
      return;
    }

    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.errorMessage = '';
        this.loadProducts();
      },
      error: (error) => {
        console.error('Error deleting product:', error);
        this.errorMessage =
          error?.error?.message || 'No se pudo eliminar el producto';
        this.cdr.detectChanges();
      }
    });
  }

  logout(): void {
    this.sessionService.logout();
    this.router.navigate(['/login']);
  }
}
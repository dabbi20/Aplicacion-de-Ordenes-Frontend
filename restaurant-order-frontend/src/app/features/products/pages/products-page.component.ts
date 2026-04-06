import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ProductService } from '../service/product.service';
import { Product } from '../models/product.model';
import { SessionService } from '../../../core/services/session.service';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-page.component.html'
})
export class ProductsPageComponent implements OnInit {
  private productService = inject(ProductService);
  private sessionService = inject(SessionService);
  private router = inject(Router);

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
        this.products = response;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.errorMessage = error?.error?.message || 'No se pudieron cargar los productos';
        this.isLoading = false;
      }
    });
  }

  logout(): void {
    this.sessionService.logout();
    this.router.navigate(['/login']);
  }
}
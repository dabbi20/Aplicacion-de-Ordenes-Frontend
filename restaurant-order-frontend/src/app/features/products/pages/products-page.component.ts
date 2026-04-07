import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ProductService } from '../service/product.service';
import { Product } from '../models/product.model';
import { SessionService } from '../../../core/services/session.service';
import { CartService } from '../../cart/service/cart.service';
import { ModalService } from '../../../shared/components/modal/modal.service';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-page.component.html'
})
export class ProductsPageComponent implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly sessionService = inject(SessionService);
  private readonly cartService = inject(CartService);
  private readonly modalService = inject(ModalService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

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

  addToCart(product: Product): void {
    this.cartService.addToCart(product);

    this.modalService.open({
      title: 'Producto agregado',
      message: `${product.name} fue agregado al carrito.`,
      type: 'success',
      confirmText: 'Aceptar'
    });
  }

  editProduct(id: number): void {
    this.router.navigate(['/products/edit', id]);
  }

  deleteProduct(id: number): void {
    this.modalService.open({
      title: 'Eliminar producto',
      message: '¿Seguro que deseas eliminar este producto?',
      type: 'confirm',
      confirmText: 'Eliminar',
      cancelText: 'Cancelar',
      onConfirm: () => {
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
    });
  }
}
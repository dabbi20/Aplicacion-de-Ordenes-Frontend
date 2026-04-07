import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ProductService } from '../service/product.service';
import { Product } from '../models/product.model';
import { SessionService } from '../../../core/services/session.service';
import { CartItem, CartService } from '../../cart/service/cart.service';
import { OrderService } from '../../orders/services/order.service';
import { CreateOrderRequest } from '../../orders/models/create-order-request.model';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './products-page.component.html'
})
export class ProductsPageComponent implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly sessionService = inject(SessionService);
  private readonly cartService = inject(CartService);
  private readonly orderService = inject(OrderService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  products: Product[] = [];
  cartItems: CartItem[] = [];
  isLoading = false;
  errorMessage = '';
  isCartOpen = false;

  selectedPaymentType: 'CASH' | 'CARD' | 'TRANSFER' = 'CASH';

  ngOnInit(): void {
    this.loadProducts();

    this.cartService.items$.subscribe((items: CartItem[]) => {
      this.cartItems = items;
      this.cdr.detectChanges();
    });
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
    this.isCartOpen = true;
  }

  getCartCount(): number {
    return this.cartService.getCount();
  }

  getCartTotal(): number {
    return this.cartService.getTotal();
  }

  toggleCart(): void {
    this.isCartOpen = !this.isCartOpen;
  }

  increaseQuantity(productId: number): void {
    this.cartService.increaseQuantity(productId);
  }

  decreaseQuantity(productId: number): void {
    this.cartService.decreaseQuantity(productId);
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  checkout(): void {
    if (this.cartItems.length === 0) {
      this.errorMessage = 'El carrito está vacío';
      this.cdr.detectChanges();
      return;
    }

    const request: CreateOrderRequest = {
      userId: 1,
      paymentType: this.selectedPaymentType,
      items: this.cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }))
    };

    this.orderService.createOrder(request).subscribe({
      next: (response) => {
        console.log('Orden creada correctamente:', response);
        this.errorMessage = '';
        this.cartService.clearCart();
        this.isCartOpen = false;
        alert('Orden creada correctamente');
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error creating order:', error);
        this.errorMessage =
          error?.error?.message || 'No se pudo crear la orden';
        this.cdr.detectChanges();
      }
    });
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
}
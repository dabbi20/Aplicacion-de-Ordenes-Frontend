import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../products/models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: CartItem[] = [];
  private itemsSubject = new BehaviorSubject<CartItem[]>([]);

  items$ = this.itemsSubject.asObservable();

  getItems(): CartItem[] {
    return this.items;
  }

  addToCart(product: Product): void {
    const existing = this.items.find(i => i.product.id === product.id);

    if (existing) {
      existing.quantity++;
    } else {
      this.items.push({ product, quantity: 1 });
    }

    this.itemsSubject.next([...this.items]);
  }

  removeFromCart(productId: number): void {
    this.items = this.items.filter(i => i.product.id !== productId);
    this.itemsSubject.next([...this.items]);
  }

  increaseQuantity(productId: number): void {
    const item = this.items.find(i => i.product.id === productId);
    if (item) {
      item.quantity++;
      this.itemsSubject.next([...this.items]);
    }
  }

  decreaseQuantity(productId: number): void {
    const item = this.items.find(i => i.product.id === productId);
    if (item) {
      item.quantity--;

      if (item.quantity <= 0) {
        this.removeFromCart(productId);
        return;
      }

      this.itemsSubject.next([...this.items]);
    }
  }

  clearCart(): void {
    this.items = [];
    this.itemsSubject.next([...this.items]);
  }

  getTotal(): number {
    return this.items.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  }

  getCount(): number {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }
}
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../products/models/product.model';

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly storageKey = 'restaurant_cart';

  private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.loadCart());

  cartItems$ = this.cartItemsSubject.asObservable();
  items$ = this.cartItems$;

  private loadCart(): CartItem[] {
    const raw = localStorage.getItem(this.storageKey);
    return raw ? JSON.parse(raw) : [];
  }

  private persist(items: CartItem[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
    this.cartItemsSubject.next(items);
  }

  getItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  getCartCount(): number {
    return this.cartItemsSubject.value.reduce((acc, item) => acc + item.quantity, 0);
  }

  getCount(): number {
    return this.getCartCount();
  }

  getSubtotal(): number {
    return this.cartItemsSubject.value.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  getTotal(): number {
    return this.getSubtotal();
  }

  addItem(item: CartItem): void {
    const items = [...this.cartItemsSubject.value];
    const existing = items.find(i => i.productId === item.productId);

    if (existing) {
      existing.quantity += item.quantity;
    } else {
      items.push({ ...item });
    }

    this.persist(items);
  }

  addToCart(product: Product): void {
    this.addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl
    });
  }

  removeItem(productId: number): void {
    const items = this.cartItemsSubject.value.filter(item => item.productId !== productId);
    this.persist(items);
  }

  removeFromCart(productId: number): void {
    this.removeItem(productId);
  }

  clearCart(): void {
    this.persist([]);
  }

  updateQuantity(productId: number, quantity: number): void {
    const items = [...this.cartItemsSubject.value];
    const item = items.find(i => i.productId === productId);

    if (!item) return;

    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }

    item.quantity = quantity;
    this.persist(items);
  }

  increaseQuantity(productId: number): void {
    const item = this.getItems().find(i => i.productId === productId);
    if (!item) return;

    this.updateQuantity(productId, item.quantity + 1);
  }

  decreaseQuantity(productId: number): void {
    const item = this.getItems().find(i => i.productId === productId);
    if (!item) return;

    this.updateQuantity(productId, item.quantity - 1);
  }
}
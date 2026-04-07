import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor(private storageService: StorageService) {}

  isLoggedIn(): boolean {
    return !!this.storageService.getToken();
  }

  getToken(): string | null {
    return this.storageService.getToken();
  }

  logout(): void {
    this.storageService.removeToken();
  }

  getRole(): string | null {
    const token = this.getToken();

    if (!token) {
      return null;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role ?? null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  getUserName(): string | null {
    return this.getUsername();
  }

  getUsername(): string | null {
    const rawUser = localStorage.getItem('user');

    if (!rawUser) {
      return null;
    }

    try {
      const user = JSON.parse(rawUser);
      return user.username || user.name || null;
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      return null;
    }
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }
}
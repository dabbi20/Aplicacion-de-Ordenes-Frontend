import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private TOKEN_KEY = 'auth_token';
  private USER_KEY = 'user';

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this.removeToken();
  }

  getUserRole(): string | null {
    const user = localStorage.getItem(this.USER_KEY);
    if (!user) return null;

    return JSON.parse(user).role ?? null;
  }

  getUserName(): string | null {
    const user = localStorage.getItem(this.USER_KEY);
    if (!user) return null;

    const parsed = JSON.parse(user);
    return parsed.username ?? parsed.name ?? null;
  }
}
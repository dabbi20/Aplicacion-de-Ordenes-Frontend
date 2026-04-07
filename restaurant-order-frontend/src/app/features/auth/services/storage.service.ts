import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private TOKEN_KEY = 'auth_token';

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
  return !!localStorage.getItem('token');
}

logout(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

getUserRole(): string | null {
  const user = localStorage.getItem('user');
  if (!user) return null;
  return JSON.parse(user).role ?? null;
}

getUserName(): string | null {
  const user = localStorage.getItem('user');
  if (!user) return null;
  return JSON.parse(user).username ?? JSON.parse(user).name ?? null;
}
}
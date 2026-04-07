import { Injectable } from '@angular/core';

interface SessionUser {
  username?: string;
  name?: string;
  role?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private readonly tokenKey = 'token';
  private readonly userKey = 'user';

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  getUser(): SessionUser | null {
    const rawUser = localStorage.getItem(this.userKey);

    if (!rawUser) {
      return null;
    }

    try {
      return JSON.parse(rawUser) as SessionUser;
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      return null;
    }
  }

  getUsername(): string | null {
    const user = this.getUser();
    return user?.username || user?.name || null;
  }

  getRole(): string | null {
    const user = this.getUser();
    return user?.role || null;
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }
}
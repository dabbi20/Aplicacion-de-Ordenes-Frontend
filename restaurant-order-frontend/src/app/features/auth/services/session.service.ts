import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private storage: StorageService) {}

  isLoggedIn(): boolean {
    return !!this.storage.getToken();
  }

  logout(): void {
    this.storage.removeToken();
  }
}
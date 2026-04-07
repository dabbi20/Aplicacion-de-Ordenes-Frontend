import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  @Input() role: string = 'SIN ROL';
  @Input() cartCount: number = 0;
  @Input() isAdmin: boolean = false;

  @Output() cartClicked = new EventEmitter<void>();
  @Output() logoutClicked = new EventEmitter<void>();

  onCartClick(): void {
    this.cartClicked.emit();
  }

  onLogoutClick(): void {
    this.logoutClicked.emit();
  }
}
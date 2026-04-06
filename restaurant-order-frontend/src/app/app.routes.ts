import { Routes } from '@angular/router';
import { LoginPageComponent } from './features/auth/pages/login-page.component';
import { RegisterPageComponent } from './features/auth/pages/register-page.component';
import { ProductsPageComponent } from './features/products/pages/products-page.component';
import { CreateProductPageComponent } from './features/products/pages/create-product-page.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '', 
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'register',
    component: RegisterPageComponent
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layout/pages/dashboard-page.component').then(m => m.DashboardPageComponent)
  },
  {
    path: 'products',
    component: ProductsPageComponent,
    canActivate: [authGuard]
  },
  {
    path: 'products/create',
    component: CreateProductPageComponent,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
import { Routes } from '@angular/router';
import { LoginPageComponent } from './features/auth/pages/login-page.component';
import { RegisterPageComponent } from './features/auth/pages/register-page.component';
import { ProductsPageComponent } from './features/products/pages/products-page.component';
import { CreateProductPageComponent } from './features/products/pages/create-product-page.component';
import { EditProductPageComponent } from './features/products/pages/edit-product-page.component';
import { OrdersPageComponent } from './features/orders/pages/orders-page.component';
import { CartPageComponent } from './features/cart/pages/cart-page.component';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
import { AppLayoutComponent } from './layout/app-layout.component';
import { AdminOrdersPageComponent } from './features/orders/pages/admin-orders-page.component';

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
    path: '',
    component: AppLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./layout/pages/dashboard-page.component').then(m => m.DashboardPageComponent)
      },
      {
        path: 'products',
        component: ProductsPageComponent
      },
      {
        path: 'products/create',
        component: CreateProductPageComponent
      },
      {
        path: 'products/edit/:id',
        component: EditProductPageComponent
      },
      {
        path: 'orders',
        component: OrdersPageComponent
      },
      {
        path: 'admin/orders',
        component: AdminOrdersPageComponent,
        canActivate: [adminGuard]
      },
      {
        path: 'cart',
        component: CartPageComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
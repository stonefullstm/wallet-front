import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home.component').then(
        (mod) => mod.HomeComponent,
      ),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./components/home/home.component').then(
        (mod) => mod.HomeComponent,
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (mod) => mod.LoginComponent,
      ),
  },
    {
    path: 'refresh',
    loadComponent: () =>
      import('./components/refresh/refresh.component').then(
        (mod) => mod.RefreshComponent,
      ),
  },
  {
    path: 'stock-data/:ticker',
    loadComponent: () =>
      import('./components/stock-data/stock-data.component').then(
        (mod) => mod.StockDataComponent,
      ),
  },
];

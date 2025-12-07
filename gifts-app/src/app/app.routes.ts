import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./gifts/pages/dashboard-page/dashboard-page').then((m) => m.DashboardPage), // Lazy loading
    // rutas hijas arreglos de rutas
    children: [
      {
        path: 'search',
        loadComponent: () => import('./gifts/pages/search-page/search-page'), // Lazy loading
      },
      {
        path: 'trending',
        loadComponent: () => import('./gifts/pages/trending-page/trending-page'), // Lazy loading
      },
       {
        path: '**',
        redirectTo: 'trending',
        pathMatch: 'full',
      }
     
    ],
  },

  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
];

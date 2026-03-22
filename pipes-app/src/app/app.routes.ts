import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: 'basic',
        loadComponent: () => import('./pages/basic-page/basic-page')
    },
    {
        path: 'numbers',
        loadComponent: () => import('./pages/numbers-page/numbers-page')
    },
    {
        path: 'custom',
        loadComponent: () => import('./pages/custom-page/custom-page')
    },
    {
        path: 'uncommon',
        loadComponent: () => import('./pages/uncommon-page/uncommon-page')
    }
];

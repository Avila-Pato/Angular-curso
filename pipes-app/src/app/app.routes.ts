import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: 'basic',
        title: 'Pipes básicos',
        loadComponent: () => import('./pages/basic-page/basic-page')
    },
    {
        path: 'numbers',
        title: 'Números Pipes',
        loadComponent: () => import('./pages/numbers-page/numbers-page')
    },
    {
        path: 'uncommon',
        title: 'Pipes no comunes ',
        loadComponent: () => import('./pages/uncommon-page/uncommon-page')
    },
    {
        path: 'custom',
        title: 'Pipes personalizados ',
        loadComponent: () => import('./pages/custom-page/custom-page')
    },

    //Ruta por defecto
    {
        path: '**',
        redirectTo: 'basic'
    }
];

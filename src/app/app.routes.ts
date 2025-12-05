import { Hero } from './pages/hero/hero';
import { Routes } from '@angular/router';
import { Counter } from './pages/counter/counter';
// Define las rutas de tu aplicación.


export const routes: Routes = [

    {
        path: "",
        component: Counter,
    },
    {
        path: "hero",
        component: Hero,
    }
];

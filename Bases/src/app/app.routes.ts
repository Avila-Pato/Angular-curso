import { Hero } from './pages/hero/hero';
import { Routes } from '@angular/router';
import { Counter } from './pages/counter/counter';
import { Dragonball } from './pages/dragonball/dragonball';
import { DragonSuperball } from './pages/dragonball-super/dragonball-super';
// Define las rutas de tu aplicación.


export const routes: Routes = [

    {
        path: "",
        component: Counter,
    },
    {
        path: "hero",
        component: Hero,
    },
    {
        path: "dragonball",
        component: Dragonball,
    },
     {
        path: "dragonball-super",
        component: DragonSuperball,
    },
    {
        path: "**",
        redirectTo: "", // Redirigir a la ruta por defecto
    }
];

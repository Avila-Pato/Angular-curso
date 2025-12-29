import { Routes } from "@angular/router";
import { ByCapital } from "./pages/by-capital/by-capital";
import { CountryLayout } from "./layouts/CountryLayout/CountryLayout";
import { ByCountryPage } from "./pages/by-country-page/by-country-page";
import { ByRegionPage } from "./pages/by-region-page/by-region-page";
import { CountryPage } from "./pages/country-page/country-page";

export const countryRutes: Routes = [
    {
        path: "",
        component: CountryLayout,

        
        children: [
            {
                path: "by-capital",
                component: ByCapital
            },
            {
                path: "by-country",
                component: ByCountryPage
            },
            {
                path: "by-region",
                component: ByRegionPage
            },
            // Ruta dinamica
            {
                path: "country/:code",
                component: CountryPage

            },
            {
                path: "**",
                redirectTo: "by-capital",
            }
        ]
    }
]

export default countryRutes
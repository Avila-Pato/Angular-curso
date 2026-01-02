import { ChangeDetectionStrategy, Component, computed, inject, resource, signal } from '@angular/core';
import { InputSearch } from "../../components/input-search/input-search";
import { CountryList } from "../../components/country-list/country-list";

import { Country as CountryService } from '../../services/country';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-by-capital',
  imports: [InputSearch, CountryList],
  templateUrl: './by.capital.html',
  styleUrl: './by-capital.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCapital {
  countryService = inject(CountryService) // inyecta el servicio http para hacer el fetch
  query = signal(''); // señal reactiva para el query de busqueda

  countryResource = resource({
    loader: async () => {
      const query = this.query();
      if (!query) return []

      return await firstValueFrom(
        this.countryService.searchByCapital(query)
      )
    }
  })

    
  // isLoading =  signal(false);
  // isError = signal<string | null>(null);
  // countries = signal<Country[]>([]);

  // onSearch(query: string) {
  //   if (this.isLoading()) return;

  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //   this.countryService.searchByCapital(query)
  //   // la funcion no se disparara hasta que se haga el subscribe
  //   .subscribe({
  //     next: (countries) => {

  //     this.isLoading.set(false);
  //     this.countries.set(countries);
      
  //     },
  //     error: (err) => {
  //       this.isLoading.set(false)
  //       this.countries.set([])
  //       this.isError.set("No se encontro un pais con esa capital")
  //     },
  //   })
  // }

 }

import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { InputSearch } from "../../components/input-search/input-search";
import { CountryList } from "../../components/country-list/country-list";
import { Country } from '../../services/country';
import { RESTCountry } from '../../interfaces/res-countries.interface';

@Component({
  selector: 'app-by-capital',
  imports: [InputSearch, CountryList],
  templateUrl: './by.capital.html',
  styleUrl: './by-capital.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCapital {
  countryService = inject(Country) // inyecta el servicio http para hacer el fetch

  isLoading =  signal(false);
  isError = signal<string | null>(null);
  countries = signal<RESTCountry[]>([]);

  onSearch(query: string) {
    if (this.isLoading()) return;

    this.isLoading.set(true);
    this.isError.set(null);

    this.countryService.searchByCapital(query)
    // la funcion no se disparara hasta que se haga el subscribe
    .subscribe((countries) => {
      this.isLoading.set(false);
      this.countries.set(countries);
      
    })
  }

 }

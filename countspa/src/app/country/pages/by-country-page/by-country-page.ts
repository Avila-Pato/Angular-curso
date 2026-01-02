import { ChangeDetectionStrategy, Component, inject, resource, signal, effect, computed } from '@angular/core';
import { InputSearch } from "../../components/input-search/input-search";
import { CountryList } from "../../components/country-list/country-list";
import { firstValueFrom } from 'rxjs';

import { Country as CountryService } from '../../services/country';

@Component({
  selector: 'app-by-country-page',
  imports: [InputSearch, CountryList],
  templateUrl: './by-country-page.html',
  styleUrl: './by-country-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCountryPage {
    countryService = inject(CountryService)
  query = signal('');
  searchTrigger = signal(0);

  constructor() {
    effect(() => {
      if (this.query()) {
        this.searchTrigger.update(v => v + 1);
      }
    });
  }

  countryResource = resource({
    loader: async () => {
      this.searchTrigger();
      const q = this.query();
      if (!q) return []

      return await firstValueFrom(
        this.countryService.searchByCountry(q)
      )
    }
  })
 }

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryInformation } from './country-information/country-information';
import { CountryService } from '../../services/country';

@Component({
  selector: 'app-country-page',
  imports: [CountryInformation],
  templateUrl: './country-page.html',
  styleUrl: './country-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryPage { 
  countryCode = inject(ActivatedRoute).snapshot.paramMap.get('code') ?? '';
  countryService = inject(CountryService)

  countryResource = rxResource({
    params: () => ({ code: this.countryCode }),
    stream: ({ params }) => this.countryService.searchByCode(params.code)
  })
}

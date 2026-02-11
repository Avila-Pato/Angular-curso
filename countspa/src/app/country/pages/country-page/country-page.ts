import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Country as CountryService } from '../../services/country';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryInformation } from './country-information/country-information';

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
    stream: ({ params }) => this.countryService.searchByAlphaCode(params.code)
  })
}

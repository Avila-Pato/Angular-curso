import { DecimalPipe } from '@angular/common';
import { Country } from '../../../interfaces/country.inteface';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';

@Component({
  selector: 'app-country-information',
  imports: [ DecimalPipe ],
  templateUrl: './country-information.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryInformation { 
  country = input.required<Country>()

  currentYear = computed(() => new Date().getFullYear())

}

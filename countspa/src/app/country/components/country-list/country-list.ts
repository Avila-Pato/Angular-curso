import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RESTCountry } from '../../interfaces/res-countries.interface';
import { RouterLink } from '@angular/router';
import { Country } from '../../interfaces/country.inteface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-country-list',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './country-list.html',
  styleUrl: './country-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryList {
  // RECIBIENDO data
    countries = input.required<Country[]>();
 }

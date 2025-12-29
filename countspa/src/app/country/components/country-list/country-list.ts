import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RESTCountry } from '../../interfaces/res-countries.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-country-list',
  imports: [RouterLink],
  templateUrl: './country-list.html',
  styleUrl: './country-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryList {
  // RECIBIENDO data
    countries = input.required<RESTCountry[]>();
 }

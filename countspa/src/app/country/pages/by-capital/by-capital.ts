import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InputSearch } from "../../components/input-search/input-search";
import { CountryList } from "../../components/country-list/country-list";

@Component({
  selector: 'app-by-capital',
  imports: [InputSearch, CountryList],
  templateUrl: './by.capital.html',
  styleUrl: './by-capital.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCapital { }

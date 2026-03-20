import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Subject, switchMap, map, startWith, catchError, of } from 'rxjs';
import { InputSearch } from "../../components/input-search/input-search";
import { CountryList } from "../../components/country-list/country-list";
import { Country as CountryService } from '../../services/country';

@Component({
  selector: 'app-by-country-page',
  imports: [InputSearch, CountryList],
  templateUrl: './by-country-page.html',
  styleUrl: './by-country-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCountryPage {
  private countryService = inject(CountryService);

  query = signal('');
  hasSearched = signal(false);

  private search$ = new Subject<string>();

  private state = toSignal(
    this.search$.pipe(
      switchMap(q =>
        this.countryService.searchByCountry(q).pipe(
          map(data => ({ loading: false, error: null, data })),
          startWith({ loading: true, error: null, data: [] }),
          catchError(err => of({ loading: false, error: err.message as string, data: [] }))
        )
      )
    ),
    { initialValue: { loading: false, error: null, data: [] } }
  );

  isLoading = computed(() => this.state().loading);
  error = computed(() => this.state().error);
  countries = computed(() => this.state().data);

  onSearch(value: string) {
    if (!value.trim()) return;
    this.query.set(value);
    this.hasSearched.set(true);
    this.search$.next(value);
  }
}

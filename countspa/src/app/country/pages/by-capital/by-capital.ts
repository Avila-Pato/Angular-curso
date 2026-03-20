import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { InputSearch } from "../../components/input-search/input-search";
import { CountryList } from "../../components/country-list/country-list";

import { CountryService } from '../../services/country';
import { catchError, map, of, startWith, Subject, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-capital',
  imports: [InputSearch, CountryList],
  templateUrl: './by.capital.html',
  styleUrl: './by-capital.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCapital {
  private countryService = inject(CountryService);

  query = signal('');
  hasSearched = signal(false);

  private search$ = new Subject<string>();

  private state = toSignal(
    this.search$.pipe(
      switchMap(q =>
        this.countryService.searchByCapital(q).pipe(
          map(data => ({ loading: false, error: null, data })),
          startWith({ loading: true, error: null, data: [] }),
          catchError(err =>
            of({ loading: false, error: err.message || "Error capital no encontrada", data: [] })
          )
        )
      )
    ),
    { initialValue: { loading: false, error: null, data: [] } }
  );

  isLoading = computed(() => this.state().loading);
  error = computed(() => this.state().error);
  capital = computed(() => this.state().data);

  onSearch(value: string) {
    if (!value.trim()) return;
    this.query.set(value);
    this.hasSearched.set(true);
    this.search$.next(value);
  }
}

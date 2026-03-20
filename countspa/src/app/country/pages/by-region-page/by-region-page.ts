import { regions } from './../../interfaces/res-countries.interface';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CountryList } from "../../components/country-list/country-list";
import { InputSearch } from "../../components/input-search/input-search";
import { CountryService } from '../../services/country';
import { catchError, map, of, startWith, Subject, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-region-page',
  imports: [CountryList, InputSearch],
  templateUrl: './by-region-page.html',
  styleUrl: './by-region-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByRegionPage {
  private countryService = inject(CountryService)

  query = signal('');
  hasSearched = signal(false);

  private search$ = new Subject<string>();

  private state = toSignal(
    this.search$.pipe(
      switchMap(q =>
        this.countryService.searchByRegion(q).pipe(
          map(data => ({ loading: false, error: null, data })),
          startWith({ loading: true, error: null, data: [] }),
          catchError(err => of({ loading: false, error: err.message as string, data: [] }))
        )
      )
    ),
    { initialValue: { loading: false, error: null, data: [] } }
  )

  isLoading = computed(() => this.state().loading)
  error = computed(() => this.state().error)
  regions = computed(() => this.state().data)


  onSearch(value: string) {
    if (!value.trim()) return;

    this.query.set(value);
    this.search$.next(value);
    this.hasSearched.set(true);
  }

}
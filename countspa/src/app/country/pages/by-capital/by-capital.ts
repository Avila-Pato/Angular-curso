import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { InputSearch } from "../../components/input-search/input-search";
import { CountryList } from "../../components/country-list/country-list";
import { Country as CountryService } from '../../services/country';
<<<<<<< HEAD
import { catchError, firstValueFrom, map, of, startWith, Subject, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
=======
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
>>>>>>> e9aefa8c87232893a7a3878b5e3553bc5e6ae713

@Component({
  selector: 'app-by-capital',
  imports: [InputSearch, CountryList],
  templateUrl: './by.capital.html',
  styleUrl: './by-capital.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCapital {
<<<<<<< HEAD
  private countryService = inject(CountryService) // inyecta el servicio http para hacer el fetch
  
  query = signal(''); // señal reactiva para el query de busqueda
  hasSearched = signal(false); // senal reactiva para saber si se ha hecho la busqueda

  private serch$ = new Subject<string>()

//Filtro
  private state  = toSignal(
    this.serch$.pipe(
      switchMap(q => 
        this.countryService.searchByCapital(q).pipe(
          map(data => ({ loading: false, error: null, data })),
          startWith({ loading: true, error: null, data: []}),
          catchError(err => of({ loading: false, error: err.message ?? "Error capital no encontrada" as string, data: []}))
        )
      )
    ),
    { initialValue: { loading: false, error: null, data: []}}
  );

  isLoading = computed(() => this.state().loading)
  error = computed(() => this.state().error)
  capital = computed(() => this.state().data)

  // busqueda
  onSearch(value : string) {
    if(!value.trim()) return;
    this.query.set(value)
    this.hasSearched.set(true)
    this.serch$.next(value)
  }

 }
=======
  countryService = inject(CountryService);
  query = signal('');

  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      if (!params.query) return of([]);

      return this.countryService.searchByCapital(params.query);
    }
  });
}
>>>>>>> e9aefa8c87232893a7a3878b5e3553bc5e6ae713

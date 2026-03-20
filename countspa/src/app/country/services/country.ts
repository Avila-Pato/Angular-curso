import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/res-countries.interface';
<<<<<<< HEAD
import { catchError, map, throwError, tap } from 'rxjs';
=======
import { catchError, count, delay, map, throwError } from 'rxjs';
>>>>>>> e9aefa8c87232893a7a3878b5e3553bc5e6ae713
import { CountryMapper } from '../mappers/country.mapper';



const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class Country {

  private http = inject(HttpClient);

  searchByCapital(query: string) {
    // ESTA ES PARA LAS PETICIONES HTTP por fetch
    query = query.toLowerCase().trim();
<<<<<<< HEAD
    const url = `${API_URL}/capital/${query}`;

    return this.http.get<RESTCountry[]>(url)
    .pipe(map((resp ) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
    catchError((error) => {
      return throwError(() => new Error(`Error al buscar la capital ${query}: ${error.message}`));
    })
  )
  } 
=======
    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
        catchError((error) => {
          return throwError(() => new Error(`Error al buscar la capital ${query}: ${error.message}`));
        })
      )
  }
>>>>>>> e9aefa8c87232893a7a3878b5e3553bc5e6ae713


  // Busqueda por nombre de pais
  searchByCountry(query: string) {
    query = query.toLowerCase().trim();
    const url = `${API_URL}/name/${query}`;

    return this.http.get<RESTCountry[]>(url)
<<<<<<< HEAD
    .pipe(
      tap(resp => console.log('API Response:', resp)),
      map((resp ) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      catchError((error) => {
        return throwError(() => new Error(`Error al buscar la capital ${query}: ${error.message}`));
      })
    )
  } 
=======
      .pipe(map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
        delay(1000),
        catchError((error) => {
          return throwError(() => new Error(`Error al buscar el país ${query}: ${error.message}`));
        })
      )
  }

  searchByAlphaCode(code: string) {
    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`)
      .pipe(map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      map((countries) => countries.at(0)),
        catchError((error) => {
          return throwError(() => new Error(`Error al buscar el pais ${code}: ${error.message}`));
        })
      )
  }
>>>>>>> e9aefa8c87232893a7a3878b5e3553bc5e6ae713
}


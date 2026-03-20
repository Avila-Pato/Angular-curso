import { RESTCountry } from '../interfaces/res-countries.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, throwError, tap, of } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import { Country } from '../interfaces/country.inteface';



const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  searchByCode(code: string) {
  const url = `${API_URL}/alpha/${code}`;

  return this.http.get<RESTCountry[]>(url)
    .pipe(
      map(resp => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      catchError((error) => {
        return throwError(() => new Error(`Error al buscar país por código ${code}: ${error.message}`));
      })
    );
}

  private http = inject(HttpClient);

  //Cache para evitar llamadas repetidas
  private capitalCache = new Map<string, Country[]>();
  private countryCache = new Map<string, Country[]>();

  searchByCapital(query: string) {
    // ESTA ES PARA LAS PETICIONES HTTP por fetch
    query = query.toLowerCase().trim();
    const url = `${API_URL}/capital/${query}`;

    if( this.capitalCache.has(query)) {
      return of(this.capitalCache.get(query) ?? []);
    }
    console.log('Haciendo petición HTTP para capital:', query);

    return this.http.get<RESTCountry[]>(url)
    .pipe(
      tap(resp => console.log('API Response:', resp)),
      map((resp ) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      catchError((error) => {
        return throwError(() => new Error(`Error al buscar la capital ${query}: ${error.message}`));
      })
    )
  }


  // Busqueda por nombre de pais
  searchByCountry(query: string) {
    query = query.toLowerCase().trim();
    const url = `${API_URL}/name/${query}`;

    if( this.countryCache.has(query)) {
      return of(this.countryCache.get(query) ?? []);
    }
    console.log('Haciendo petición HTTP para pais:', query);

    return this.http.get<RESTCountry[]>(url)
    .pipe(
      tap(resp => console.log('API Response:', resp)),
      map((resp ) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      catchError((error) => {
        return throwError(() => new Error(`Error al buscar la capital ${query}: ${error.message}`));
      })
    )
  } 
}


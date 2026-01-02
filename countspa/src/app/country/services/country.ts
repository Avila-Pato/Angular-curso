import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/res-countries.interface';
import { catchError, map, throwError } from 'rxjs';
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
    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
    .pipe(map((resp ) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
    catchError((error) => {
      return throwError(() => new Error(`Error al buscar la capital ${query}: ${error.message}`));
    })
  )
  } 


  // Busqueda por nombre de pais
  searchByCountry(query: string) {
    query = query.toLowerCase().trim();
    const url = `${API_URL}/name/${query}`;

    return this.http.get<RESTCountry[]>(url)
    .pipe(map((resp ) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
    catchError((error) => {
      return throwError(() => new Error(`Error al buscar la capital ${query}: ${error.message}`));
    })
  )
  } 
}


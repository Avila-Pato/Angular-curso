import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/res-countries.interface';



const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class Country {

  private http = inject(HttpClient);

  searchByCapital(query: string) { 
    query = query.toLowerCase().trim();
    // ESTA ES PARA LAS PETICIONES HTTP por fetch
    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`);
  }

}

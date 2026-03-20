import { Country } from '../interfaces/country.inteface';
import { RESTCountry } from './../interfaces/res-countries.interface';
export class CountryMapper {
  static mapRestCountryToCountry(restCountry: RESTCountry): Country {
    return {
      capital: restCountry.capital?.join(', ') ?? 'Sin capital',
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.translations?.['spa']?.common ?? restCountry.name.common,
      population: restCountry.population,
      region: restCountry.region,
      subregion: restCountry.subregion
    };
  }

  static mapRestCountryArrayToCountryArray (
    restCountries: RESTCountry[]
  ): Country[] {
    return restCountries.map(country => this.mapRestCountryToCountry(country))
  }
}

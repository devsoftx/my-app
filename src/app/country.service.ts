import { Injectable } from '@angular/core';
import { Country } from '../app/Country'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  countryUrl : string;

  constructor(
    private http: HttpClient) { 
      this.countryUrl = environment.serverUrl;
    }

    getAllCountries(): Observable<Country[]> {
      return this.http.get<Country[]>(this.countryUrl + 'api/countries');
    }

    getAllCountriesByName(name: string): Observable<Country[]> {
      return this.http.get<Country[]>(this.countryUrl + 'api/countries/find?nmEn=' + name);
    }
}

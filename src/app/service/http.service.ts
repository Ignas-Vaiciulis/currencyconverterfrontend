import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private API_SERVER = '/currency/';

  constructor(private http: HttpClient) {
  }

  getCurrencyData(abbreviation: string){
    return this.http.get(this.API_SERVER + '?name=' + abbreviation);
  }
  getCurrencyDataForChart(abbreviation: string, startDate: string, endDate: string){
    return this.http.get(this.API_SERVER + abbreviation + '/' + startDate + '/' + endDate);
  }
}

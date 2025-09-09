import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { TickerData } from '../../models/tickerData';

@Injectable({
  providedIn: 'root'
})
export class TickersService {
  private http = inject(HttpClient);

  private baseUrl = '';

  constructor() {
     this.baseUrl = `http://${environment.apiUrl}/stocks/`;
  }

  getTickers(): Observable<TickerData[]> {
    return this.http.get<TickerData[]>(this.baseUrl);
  }
}

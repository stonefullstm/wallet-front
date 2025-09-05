import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MaxminData } from '../../models/maxminData';
import { HistoryData } from '../../models/historyData';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private http = inject(HttpClient);

  private baseUrl = '';

  constructor() {
    this.baseUrl = `http://${environment.apiUrl}/history/`;
  }

  getMaxMinData(): Observable<MaxminData[]> {
    return this.http.get<MaxminData[]>(this.baseUrl + 'get-last-day/');
  }

  getHistoryData(
    ticker: string,
    dataInicial: string,
    dataFinal: string,
  ): Observable<HistoryData[]> {
    return this.http.get<HistoryData[]>(
      this.baseUrl +
        `retrieve/${ticker}/?start_date=${dataInicial}&end_date=${dataFinal}`,
    );
  }
}

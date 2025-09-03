import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MaxminData } from '../../models/maxminData';

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
}

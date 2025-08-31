import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { TokenData } from '../../models/tokenData';
import { LoginData } from '../../models/loginData';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private http = inject(HttpClient);

  private baseUrl: string = "";
  tokenData: TokenData | any;

  constructor() {
    this.baseUrl = `http://${environment.apiUrl}/api/token/`;
  }

  getToken(login: LoginData): Observable<TokenData> {
    this.tokenData = this.http
      .post<TokenData>(this.baseUrl, login);
    return this.tokenData;
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  setToken(key: string, data: string) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getToken(key: string): string | null {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }
}

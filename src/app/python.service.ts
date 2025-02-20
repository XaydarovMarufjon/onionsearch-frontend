import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PythonService {
  private apiUrl = 'http://localhost:3000/search';

  constructor(private http: HttpClient) { }

  search(query: string) {
    return this.http.get(`${this.apiUrl}?query=${query}`);
  }
}

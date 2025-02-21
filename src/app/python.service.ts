import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Link {
  num: number;
  resurs: string;
  title: string;
  url: string;
}
@Injectable({
  providedIn: 'root',
})
export class PythonService {
  private apiUrl = 'http://localhost:3000/search';

  constructor(private http: HttpClient) { }

  search(query: string) {
    return this.http.get(`${this.apiUrl}?query=${query}`);
  }

  getLinks(): Observable<Link[]> {
    return this.http.get<Link[]>(this.apiUrl);
  }

}




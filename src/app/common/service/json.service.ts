import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonService {
    
private apiUrl = '../json/levels.json'; 

  constructor(private http: HttpClient) { }

  obterLimitesExperiencia(): Observable<number[]> {
    return this.http.get<number[]>(this.apiUrl);
  }
}

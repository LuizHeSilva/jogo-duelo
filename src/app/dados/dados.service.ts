import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DadoService {

  private apiUrl = 'https://www.dejete.com/api';

  constructor(private http: HttpClient) { }

  rolarDado(qtdDados: number, qtdLados: number): Observable<any> {
    const params = new HttpParams()
      .set('nbde', qtdDados.toString())
      .set('tpde', qtdLados.toString());

    return this.http.get<any>(this.apiUrl, { params });
  }
}

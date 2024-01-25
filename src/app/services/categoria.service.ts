import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ResponseApi } from '../Interfaces/response-api';
import { Categoria } from '../Interfaces/categoria';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private urlApi: string = environment.apiUrl + 'categoria/';

  constructor(private http: HttpClient) { }

  listarCategorias(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}listarCategorias`);
  }
}

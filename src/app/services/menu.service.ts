import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ResponseApi } from '../Interfaces/response-api';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private urlApi: string = environment.apiUrl + 'menu/';

  constructor(private http: HttpClient) { }

  // listar menus por usuario
  listarMenus(idUsuario: number): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}listarMenusPorUsuario/${idUsuario}`);
  }
}

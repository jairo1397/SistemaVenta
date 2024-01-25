import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ResponseApi } from '../Interfaces/response-api';
import { Producto } from '../Interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private urlApi: string = environment.apiUrl + 'dashboard/';

  constructor(private http: HttpClient) { }

  listarProductos(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}listarProductos`);
  }
  registrarProducto(request: Producto): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}registrarProducto`, request);
  }
  actualizarProducto(request: Producto): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}actualizarProducto`, request);
  }
  eliminarProducto(request: Producto): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}eliminarProducto`, request);
  }
}

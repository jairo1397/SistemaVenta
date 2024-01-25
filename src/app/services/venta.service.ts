import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ResponseApi } from '../Interfaces/response-api';
import { Venta } from '../Interfaces/venta';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private urlApi: string = environment.apiUrl + 'venta/';

  constructor(private http: HttpClient) { }

  listarVentas(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}listarVentas`);
  }
  registrarVenta(request: Venta): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}registrarVenta`, request);
  }
  historialVentas(buscarPor: string, numeroVenta: string, fichaInicio: string, fechaFin: string): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}historialVentas`, { buscarPor, numeroVenta, fichaInicio, fechaFin });
  }
  reporteVentas(fichaInicio: string, fechaFin: string): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}reporteVentas`, { fichaInicio, fechaFin });
  }
}

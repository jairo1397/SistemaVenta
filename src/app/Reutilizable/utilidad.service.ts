import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Sesion } from '../Interfaces/sesion';

@Injectable({
  providedIn: 'root'
})
export class UtilidadService {

  constructor(private _snackBar: MatSnackBar) { }

  mostrarAlerta(mensaje: string, tipo: string) {
    this._snackBar.open(mensaje, tipo, {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
  guardarSesion(usuarioSesion: Sesion) {
    localStorage.setItem('usuario', JSON.stringify(usuarioSesion));
  }
  obtenerSesion() {
    const dataCadena = localStorage.getItem('usuario');
    const usuario = JSON.parse(dataCadena!);
    return usuario;
  }
  eliminarSesion() {
    localStorage.removeItem('usuario');
  }
}

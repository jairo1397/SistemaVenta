import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../Interfaces/login';
import { UsuarioService } from '../../services/usuario.service';
import { UtilidadService } from '../../Reutilizable/utilidad.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  ocultarPassword = true;
  mostrarLoading = false;

  constructor(
    private fb: FormBuilder,
    private _usuarioService: UsuarioService,
    private _utilidadService: UtilidadService,
    private router: Router
  ) {
    this.formLogin = this.fb.group({
      correo: ['', Validators.required],
      clave: ['', Validators.required]
    });
  }

  ngOnInit(): void { }

  iniciarSesion() {
    this.mostrarLoading = true;
    const request: Login = {
      correo: this.formLogin.value.correo,
      clave: this.formLogin.value.clave
    };
    this._usuarioService.iniciarSesion(request).subscribe({
      next: (data) => {
        if (data.status) {
          this._utilidadService.guardarSesion(data.value);
          this.router.navigate(['pages']);
        } else {
          this._utilidadService.mostrarAlerta('No se encontraron considencias', 'Opps!');
        }
      },
      complete: () => {
        this.mostrarLoading = false;
      },
      error: (error) => {
        this._utilidadService.mostrarAlerta('Hubo un error', 'Opps!');
        this.mostrarLoading = false;
      }
    }
    );
  }
}

import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rol } from '../../../../Interfaces/rol';
import { Usuario } from '../../../../Interfaces/usuario';

import { UsuarioService } from '../../../../services/usuario.service';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';
import { RolService } from '../../../../services/rol.service';

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrl: './modal-usuario.component.css'
})
export class ModalUsuarioComponent implements OnInit {

  formUser: FormGroup;
  ocultarPassword: boolean = true;
  tituloAccion: string = 'Agregar';
  botonAccion: string = 'Guardar';
  listaRoles: Rol[] = [];


  constructor(
    private modalActual: MatDialogRef<ModalUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public datosUsuario: Usuario,
    private fb: FormBuilder,
    private _rolService: RolService,
    private _usuarioService: UsuarioService,
    private _utilidadService: UtilidadService
  ) {
    this.formUser = this.fb.group({
      nombreCompleto: ['', Validators.required],
      correo: ['', Validators.required],
      clave: ['', Validators.required],
      idRol: ['', Validators.required],
      esActivo: ['1', Validators.required]
    });

    if (datosUsuario) {
      this.tituloAccion = 'Editar';
      this.botonAccion = 'Actualizar';
    }

    this._rolService.listarRoles().subscribe({
      next: (data) => {
        if (data.status) this.listaRoles = data.value;
      },
      error: (error) => {
        this._utilidadService.mostrarAlerta('Hubo un error', 'Opps!');
      }
    });
  }

  ngOnInit(): void {
    if (this.datosUsuario) {
      this.formUser.patchValue({
        nombreCompleto: this.datosUsuario.nombreCompleto,
        correo: this.datosUsuario.correo,
        idRol: this.datosUsuario.idRol,
        esActivo: this.datosUsuario.esActivo.toString()
      });
    }
  }

  guardarEditar_usuario() {
    const _usuario: Usuario = {
      idUsuario: this.datosUsuario == null ? 0 : this.datosUsuario.idUsuario,
      nombreCompleto: this.formUser.value.nombreCompleto,
      correo: this.formUser.value.correo,
      clave: this.formUser.value.clave,
      idRol: this.formUser.value.idRol,
      rolDescripcion: "",
      esActivo: parseInt(this.formUser.value.esActivo)
    }

    if (this.datosUsuario == null) {
      this._usuarioService.registrarUsuario(_usuario).subscribe({
        next: (data) => {
          if (data.status) {
            this._utilidadService.mostrarAlerta('Se agregó correctamente', 'Usuario');
            this.modalActual.close(true);
          } else {
            this._utilidadService.mostrarAlerta('No se agregó correctamente', 'Opps!');
          }
        },
        error: (error) => {
          this._utilidadService.mostrarAlerta('Hubo un error', 'Opps!');
        }
      });
    } else {
      this._usuarioService.actualizarUsuario(_usuario).subscribe({
        next: (data) => {
          if (data.status) {
            this._utilidadService.mostrarAlerta('Se actualizó correctamente', 'Usuario');
            this.modalActual.close(true);
          } else {
            this._utilidadService.mostrarAlerta('No se actualizó correctamente', 'Opps!');
          }
        },
        error: (error) => {
          this._utilidadService.mostrarAlerta('Hubo un error', 'Opps!');
        }
      });
    }


  }
}

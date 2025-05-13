import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CommonModule } from '@angular/common';
import { setListRow } from '../../util/methods';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserResponse } from '../../model/api/response/UserResponse';
import { UserRequest } from '../../model/api/request/UserRequest';
import { RolResponse } from '../../model/api/response/RolResponse';
import { Proveedor } from '../../model/dto/Proveedor';
import { UsuarioService } from '../../service/security/usuario.service';
import { RolService } from '../../service/security/rol.service';
import { ProveedorService } from '../../service/master/proveedor.service';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectChange } from '@angular/material/select';
import { RolRequest } from '../../model/api/request/RolRequest';
import { RegexConstants } from '../../util/constant';

@Component({
  selector: 'app-usuario',
  imports: [CommonModule,
    NgxDatatableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSlideToggleModule,
    FormsModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit {

  public RG = RegexConstants;

  listRol: RolResponse[] = [];
  listProveedor: Proveedor[] = [];
  viewListProveedor: boolean = false;

  result: UserResponse[] = [];
  filter: UserRequest = {};
  record: UserRequest = {};
  columns: any[] = [];

  @ViewChild('colRolTemplate', { static: true }) colRolTemplate!: TemplateRef<any>;
  @ViewChild('colAccionTemplate', { static: true }) colAccionTemplate!: TemplateRef<any>;
  @ViewChild('dialogTemplate', { static: true }) dialogTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  constructor(
    private dialog: MatDialog,
    private usuarioService: UsuarioService,
    private rolService: RolService,
    private proveedorService: ProveedorService
  ) { }

  ngOnInit() {
    forkJoin({
      resultRol: this.rolService.list(new RolRequest()),
      resultProveedor: this.proveedorService.list({}),
    }).subscribe({
      next: ({ resultRol, resultProveedor }) => {
        this.listProveedor = resultProveedor;
        this.listRol = resultRol;

        this.search();
      },
      error: (err) => {
        Swal.close();
        Swal.fire({
          icon: 'warning',
          title: '¡Advertencia!',
          text: 'Error al inicializar ' + err.error,
        });
      }
    });
  }

  cleanSearch() {
    this.filter = {};
    this.search();
  }

  search() {
    forkJoin({
      resultResponse: this.usuarioService.list(this.filter)
    }).subscribe({
      next: ({ resultResponse }) => {
        this.result = setListRow(resultResponse);
        this.initTable();
      },
      error: (err) => {
        Swal.close();
        Swal.fire({
          icon: 'warning',
          title: '¡Advertencia!',
          text: err.error,
        });
      }
    });
  }

  openAdd() {
    this.record = {};
    this.initVisibleListProveedor(null);
    this.dialogRef = this.dialog.open(this.dialogTemplate, {
      width: '400px'
    });
  }

  openEdit(value: UserResponse) {
    this.record = {
      id: value.id,
      rolId: value.rol?.id,
      proveedorId: value.proveedor?.id,
      nombre: value.nombre,
      apellidoPaterno: value.apellidoPaterno,
      apellidoMaterno: value.apellidoMaterno,
      updatePassword: false,
      clave: '',
    };
    this.initVisibleListProveedor(value.rol?.id);
    this.dialogRef = this.dialog.open(this.dialogTemplate, {
      width: '400px'
    });
  }

  selectRol(event: MatSelectChange) {
    const rolIdSelect = event.value;
    this.initVisibleListProveedor(rolIdSelect);
  }

  initVisibleListProveedor(rolIdSelect: any) {
    this.viewListProveedor = rolIdSelect && this.listRol.find((x: RolResponse) => x.id == rolIdSelect)?.isProveedor;
  }

  save() {
    let esProv = this.listRol.find((x: RolResponse) => x.id == this.record.rolId)?.isProveedor;
    console.log(esProv);
    console.log(this.record.proveedorId);
    if (!this.record.nombre || !this.record.apellidoPaterno || !this.record.apellidoMaterno
      || !this.record.rolId || (!this.record.id && !this.record.cuenta)
      || ((!this.record.id || this.record.updatePassword) && !this.record.clave)
      || (esProv && !this.record.proveedorId)) {
      Swal.fire({
        icon: 'warning',
        title: 'Debe ingresar todos los valores obligatorios',
      });
      return;
    }
    this.usuarioService.save(this.record).subscribe(
      (result: UserResponse) => {
        this.search();
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: this.record.id ? 'Actualización Exitosa' : 'Registro Exitoso',
          text: 'El usuario ' + result.nombre + ' fue ' + (this.record.id ? 'actualizado' : 'registrado'),
        });
        this.dialogRef.close();
      },
      (err: any) => {
        Swal.close();
        Swal.fire({
          icon: 'warning',
          title: '¡Advertencia!',
          text: err.error,
        });
      }
    );
  }

  delete(value: UserResponse) {
    Swal.fire({
      title: '¿Está seguro de eliminar el usuario seleccionado?',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Si',
      focusCancel: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.delete(value).subscribe(
          (result: UserResponse) => {
            this.search();
            Swal.close();
            Swal.fire({
              icon: 'success',
              title: 'Eliminación Exitosa',
              text: 'El usuario ' + result.nombre + ' fue eliminado',
            });
          },
          (err: any) => {
            Swal.close();
            Swal.fire({
              icon: 'warning',
              title: '¡Advertencia!',
              text: err.error,
            });
          }
        );
      }
    });
  }

  initTable() {
    this.columns = [
      { name: 'Nro.', prop: 'row', width: 20 },
      { name: 'Rol', cellTemplate: this.colRolTemplate, width: 110 },
      { name: 'Nombre', prop: 'nombre', width: 40 },
      { name: 'Apellido Paterno', prop: 'apellidoPaterno', width: 40 },
      { name: 'Apellido Materno', prop: 'apellidoMaterno', width: 40 },
      { name: 'Cuenta', prop: 'cuenta', width: 40 },
      { name: 'Acciones', cellTemplate: this.colAccionTemplate, width: 50 }
    ];
  }

}

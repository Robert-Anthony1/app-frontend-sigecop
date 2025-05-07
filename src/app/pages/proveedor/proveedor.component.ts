import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Proveedor } from '../../model/dto/Proveedor';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ProveedorService } from '../../service/master/proveedor.service';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CommonModule } from '@angular/common';
import { setListRow } from '../../util/methods';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-proveedor',
  imports: [CommonModule,
    NgxDatatableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule],
  templateUrl: './proveedor.component.html',
  styleUrl: './proveedor.component.css'
})
export class ProveedorComponent implements OnInit {

  result: Proveedor[] = [];
  filter: Proveedor = {};
  record: Proveedor = {};
  columns: any[] = [];

  @ViewChild('colAccionTemplate', { static: true }) colAccionTemplate!: TemplateRef<any>;
  @ViewChild('dialogTemplate', { static: true }) dialogTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  constructor(
    private dialog: MatDialog,
    private service: ProveedorService
  ) { }

  ngOnInit() {
    this.search();
  }

  search() {
    forkJoin({
      resultResponse: this.service.list(this.filter)
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
    this.dialogRef = this.dialog.open(this.dialogTemplate, {
      width: '400px'
    });
  }

  openEdit(value: Proveedor) {
    this.record = JSON.parse(JSON.stringify(value));
    this.dialogRef = this.dialog.open(this.dialogTemplate, {
      width: '400px'
    });
  }

  save() {

  }

  delete(value: Proveedor) {
    Swal.fire({
      title: '¿Está seguro de eliminar el proveedor seleccionado?',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Si',
      focusCancel: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(value).subscribe(
          (result: Proveedor) => {
            this.search();
            Swal.close();
            Swal.fire({
              icon: 'success',
              title: 'Eliminación Exitosa',
              text: 'El proveedor con el ruc ' + result.ruc + ' fue eliminado',
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
      { name: 'Nro.', prop: 'row' },
      { name: 'Ruc', prop: 'ruc' },
      { name: 'Razón Social', prop: 'razonSocial' },
      { name: 'Nombre Comercial', prop: 'nombreComercial' },
      { name: 'Dirección', prop: 'direccion', },
      { name: 'Teléfono', prop: 'telefono', },
      { name: 'Correo', prop: 'correo', },
      { name: 'Acciones', cellTemplate: this.colAccionTemplate }
    ];
  }

}

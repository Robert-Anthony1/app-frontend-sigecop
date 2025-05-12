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
import { Pagina } from '../../model/dto/Pagina';
import { PaginaService } from '../../service/security/pagina.service';

@Component({
  selector: 'app-pagina',
  imports: [CommonModule,
    NgxDatatableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule],
  templateUrl: './pagina.component.html',
  styleUrl: './pagina.component.css'
})
export class PaginaComponent implements OnInit {

  result: Pagina[] = [];
  filter: Pagina = {};
  record: Pagina = {};
  columns: any[] = [];

  @ViewChild('colAccionTemplate', { static: true }) colAccionTemplate!: TemplateRef<any>;
  @ViewChild('dialogTemplate', { static: true }) dialogTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  constructor(
    private dialog: MatDialog,
    private service: PaginaService
  ) { }

  ngOnInit() {
    this.search();
  }

  cleanSearch() {
    this.filter = {};
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

  openEdit(value: Pagina) {
    this.record = JSON.parse(JSON.stringify(value));
    this.dialogRef = this.dialog.open(this.dialogTemplate, {
      width: '400px'
    });
  }

  save() {
    if (!this.record.nombre || !this.record.url) {
      Swal.fire({
        icon: 'warning',
        title: 'Debe ingresar todos los valores obligatorios',
      });
      return;
    }
    this.service.save(this.record).subscribe(
      (result: Pagina) => {
        this.search();
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: this.record.id ? 'Actualización Exitosa' : 'Registro Exitoso',
          text: 'La página ' + result.nombre + ' fue ' + (this.record.id ? 'actualizada' : 'registrada'),
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

  delete(value: Pagina) {
    Swal.fire({
      title: '¿Está seguro de eliminar la página seleccionada?',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Si',
      focusCancel: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(value).subscribe(
          (result: Pagina) => {
            this.search();
            Swal.close();
            Swal.fire({
              icon: 'success',
              title: 'Eliminación Exitosa',
              text: 'La página ' + result.nombre + ' fue eliminada',
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
      { name: 'Nro.', prop: 'row', width: 40 },
      { name: 'Nombre', prop: 'nombre' },
      { name: 'Url', prop: 'url' },
      { name: 'Acciones', cellTemplate: this.colAccionTemplate, width: 80 }
    ];
  }

}

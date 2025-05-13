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
import { Categoria } from '../../model/dto/Categoria';
import { CategoriaService } from '../../service/master/categoria.service';
import { RegexConstants } from '../../util/constant';
@Component({
  selector: 'app-categoria',
  imports: [CommonModule,
    NgxDatatableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent implements OnInit {

  public RG = RegexConstants;

  result: Categoria[] = [];
  filter: Categoria = {};
  record: Categoria = {};
  columns: any[] = [];

  @ViewChild('colAccionTemplate', { static: true }) colAccionTemplate!: TemplateRef<any>;
  @ViewChild('dialogTemplate', { static: true }) dialogTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  constructor(
    private dialog: MatDialog,
    private service: CategoriaService
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

  openEdit(value: Categoria) {
    this.record = JSON.parse(JSON.stringify(value));
    this.dialogRef = this.dialog.open(this.dialogTemplate, {
      width: '400px'
    });
  }

  save() {
    if (!this.record.nombre) {
      Swal.fire({
        icon: 'warning',
        title: 'Debe ingresar todos los valores obligatorios',
      });
      return;
    }
    this.service.save(this.record).subscribe(
      (result: Categoria) => {
        this.search();
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: this.record.id ? 'Actualización Exitosa' : 'Registro Exitoso',
          text: 'La categoria ' + result.nombre + ' fue ' + (this.record.id ? 'actualizado' : 'registrado'),
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

  delete(value: Categoria) {
    Swal.fire({
      title: '¿Está seguro de eliminar la categoría seleccionada?',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Si',
      focusCancel: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(value).subscribe(
          (result: Categoria) => {
            this.search();
            Swal.close();
            Swal.fire({
              icon: 'success',
              title: 'Eliminación Exitosa',
              text: 'La categoría ' + result.nombre + ' fue eliminada',
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
      { name: 'Acciones', cellTemplate: this.colAccionTemplate, width: 80 }
    ];
  }


}

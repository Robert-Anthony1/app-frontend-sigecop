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
import { ProductoResponse } from '../../model/api/response/ProductoResponse';
import { ProductoRequest } from '../../model/api/request/ProductoRequest';
import { ProductoService } from '../../service/master/producto.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-producto',
  imports: [CommonModule,
    NgxDatatableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent implements OnInit {

  listCategoria: Categoria[] = [];

  result: ProductoResponse[] = [];
  filter: ProductoRequest = {};
  record: ProductoRequest = {};
  columns: any[] = [];

  @ViewChild('colAccionTemplate', { static: true }) colAccionTemplate!: TemplateRef<any>;
  @ViewChild('dialogTemplate', { static: true }) dialogTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  constructor(
    private dialog: MatDialog,
    private productoService: ProductoService,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit() {
    forkJoin({
      categoriaResponse: this.categoriaService.list({})
    }).subscribe({
      next: ({ categoriaResponse }) => {
        this.listCategoria = categoriaResponse;
        this.search();
      },
      error: (err) => {
        Swal.close();
        Swal.fire({
          icon: 'warning',
          title: '¡Advertencia!',
          text: 'Error al inicializar: ' + err.error,
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
      resultResponse: this.productoService.list(this.filter)
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

  openEdit(value: ProductoResponse) {
    this.record = {
      id: value.id,
      categoriaId: value.categoria?.id,
      nombre: value.nombre,
      descripcion: value.descripcion,
      precioUnitario: value.precioUnitario
    };
    this.dialogRef = this.dialog.open(this.dialogTemplate, {
      width: '400px'
    });
  }

  save() {
    if (!this.record.categoriaId || !this.record.nombre) {
      Swal.fire({
        icon: 'warning',
        title: 'Debe ingresar todos los valores obligatorios',
      });
      return;
    }
    this.productoService.save(this.record).subscribe(
      (result: ProductoResponse) => {
        this.search();
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: this.record.id ? 'Actualización Exitosa' : 'Registro Exitoso',
          text: 'El producto ' + result.nombre + ' fue ' + (this.record.id ? 'actualizado' : 'registrado'),
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

  delete(value: ProductoResponse) {
    Swal.fire({
      title: '¿Está seguro de eliminar el producto seleccionado?',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Si',
      focusCancel: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.delete(value).subscribe(
          (result: ProductoResponse) => {
            this.search();
            Swal.close();
            Swal.fire({
              icon: 'success',
              title: 'Eliminación Exitosa',
              text: 'El producto ' + result.nombre + ' fue eliminado',
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
      { name: 'Nro.', prop: 'row', width: 30 },
      { name: 'Categoría', prop: 'categoria.nombre' },
      { name: 'Nombre', prop: 'nombre' },
      { name: 'Descripción', prop: 'descripcion' },
      { name: 'Precio Unitario', prop: 'precioUnitario' },
      { name: 'Acciones', cellTemplate: this.colAccionTemplate, width: 60 }
    ];
  }



}

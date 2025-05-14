import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CommonModule } from '@angular/common';
import { setListRow } from '../../util/methods';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SolicitudResponse } from '../../model/api/response/SolicitudResponse';
import { SolicitudRequest } from '../../model/api/request/SolicitudRequest';
import { SolicitudService } from '../../service/gestion/solicitud.service';
import { EstadoSolicitudService } from '../../service/gestion/estadoSolicitud.service';
import { ProductoResponse } from '../../model/api/response/ProductoResponse';
import { EstadoSolicitudResponse } from '../../model/api/response/EstadoSolicitudResponse';
import { Proveedor } from '../../model/dto/Proveedor';
import { SolicitudProductoRequest } from '../../model/api/request/SolicitudProductoRequest';
import { ProveedorService } from '../../service/master/proveedor.service';
import { ProductoService } from '../../service/master/producto.service';
import { RegexConstants } from '../../util/constant';



@Component({
  selector: 'app-solicitud',
  imports: [CommonModule,
    NgxDatatableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    FormsModule],
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.css'
})
export class SolicitudComponent implements OnInit{
    public RG = RegexConstants;

    result: SolicitudResponse[] = [];
    filter: SolicitudRequest = {};
    record: SolicitudRequest = {};
    columns: any[] = [];
    
    listEstados: EstadoSolicitudResponse[] = [];
    listProveedores: Proveedor[] = [];
    listProductos: ProductoResponse[] = [];
    selectedProductos: SolicitudProductoRequest[] = [];
    selectedProveedores: number[] = [];

    @ViewChild('colAccionTemplate', { static: true }) colAccionTemplate!: TemplateRef<any>;
    @ViewChild('dialogTemplate', { static: true }) dialogTemplate!: TemplateRef<any>;
    dialogRef!: MatDialogRef<any>;

    constructor(
        private dialog: MatDialog,
        private service: SolicitudService,
        private estadoService: EstadoSolicitudService,
        private proveedorService: ProveedorService,
        private productoService: ProductoService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.loadInitialData();
    }

    loadInitialData() {
        forkJoin({
            estados: this.estadoService.list({}),
            proveedores: this.proveedorService.list({}),
            productos: this.productoService.list({})
        }).subscribe({
            next: ({ estados, proveedores, productos }) => {
                this.listEstados = estados;
                this.listProveedores = proveedores;
                this.listProductos = productos;
                this.search();
            },
            error: (err) => {
                Swal.fire('Error', 'No se pudo cargar datos iniciales', 'error');
            }
        });
    }

    cleanSearch() {
        this.filter = {};
        this.search();
    }

    private handleError(err: any) {
        const errorMessage = err?.error?.message || err?.error || 'Ocurrió un error inesperado';
        Swal.fire('Error', errorMessage, 'error');
    }


    search() {
        this.service.list(this.filter).subscribe({
            next: (response) => {
                this.result = setListRow(response);
                this.initTable();
            },
            error: (err) => {
                this.handleError(err);
            }
        });
    }

    openAdd() {
        this.record = {};
        this.selectedProductos = [];
        this.selectedProveedores = [];
        this.dialogRef = this.dialog.open(this.dialogTemplate, { width: '800px' });

        this.cdr.detectChanges();
    }

    openEdit(item: SolicitudResponse) {
        this.record = {
            id: item.id,
            codigo: item.codigo,
            descripcion: item.descripcion,
            fechaCreacion: item.fechaCreacion,
            fechaVencimiento: item.fechaVencimiento,
            estadoId: item.estado?.id
        };
        
        this.selectedProveedores = item.proveedores?.map(p => p.id!) || [];
        this.selectedProductos = item.solicitudProducto?.map(p => ({
            id: p.id,
            productoId: p.producto?.id,
            cantidad: p.cantidad
        })) || [];
        
        this.dialogRef = this.dialog.open(this.dialogTemplate, { width: '800px' });
        
        this.cdr.detectChanges();
    }

    save() {
        const descripcionInvalida = !this.record.descripcion || this.record.descripcion.trim() === '';
        const fechaCreacionInvalida = !this.record.fechaCreacion;
        const fechaVencimientoInvalida = !this.record.fechaVencimiento;
        const proveedoresInvalidos = !this.selectedProveedores || this.selectedProveedores.length === 0;
        const productosInvalidos = !this.selectedProductos || this.selectedProductos.length === 0;
        const productosConError = this.selectedProductos?.some(p => !p.productoId || !p.cantidad || p.cantidad <= 0);

        if (descripcionInvalida || fechaCreacionInvalida || fechaVencimientoInvalida || 
            proveedoresInvalidos || productosInvalidos || productosConError) {
            Swal.fire('Error', 'Debe llenar todos los campos obligatorios.', 'error');
            return;
        }

        // Asignación de proveedores y productos al record
        this.record.proveedores = this.selectedProveedores;
        this.record.solicitudProducto = this.selectedProductos;

        // Guardar solicitud
        this.service.save(this.record).subscribe({
            next: (response) => {
                Swal.fire('Éxito', 'Solicitud guardada correctamente', 'success');
                this.search();
                this.dialogRef.close();
            },
            error: (err) => {
                this.handleError(err);
            }
        });
    }


    delete(item: SolicitudResponse) {
        Swal.fire({
            title: 'Confirmar eliminación',
            text: `¿Está seguro de eliminar la solicitud ${item.codigo}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                this.service.delete(item.id).subscribe({
                    next: () => {
                        Swal.fire('Éxito', 'Solicitud eliminada', 'success');
                        this.search();
                        this.cdr.detectChanges();
                    },
                    error: (err) => {
                        this.handleError(err);
                    }
                });
            }
        });
    }

    addProducto() {
        this.selectedProductos.push({ productoId: undefined, cantidad: 1 });
    }

    removeProducto(index: number) {
        this.selectedProductos.splice(index, 1);
    }

    private validateForm(): boolean {
        if (!this.record.codigo || !this.record.descripcion || !this.record.fechaCreacion || 
            !this.record.fechaVencimiento || !this.record.estadoId) {
            Swal.fire('Advertencia', 'Complete todos los campos obligatorios', 'warning');
            return false;
        }
        
        if (this.selectedProveedores.length === 0) {
            Swal.fire('Advertencia', 'Seleccione al menos un proveedor', 'warning');
            return false;
        }
        
        if (this.selectedProductos.length === 0) {
            Swal.fire('Advertencia', 'Agregue al menos un producto', 'warning');
            return false;
        }
        
        return true;
    }

    private initTable() {
        this.columns = [
            { name: 'Nro.', prop: 'row', width: 50 },
            { name: 'Código', prop: 'codigo', width: 100 },
            { name: 'Descripción', prop: 'descripcion' },
            { name: 'Estado', prop: 'estado.descripcion', width: 120 },
            { name: 'F. Creación', prop: 'fechaCreacion', pipe: { transform: (d: Date) => d ? new Date(d).toLocaleDateString() : '' }, width: 120 },
            { name: 'F. Vencimiento', prop: 'fechaVencimiento', pipe: { transform: (d: Date) => d ? new Date(d).toLocaleDateString() : '' }, width: 120 },
            { name: 'Acciones', cellTemplate: this.colAccionTemplate, width: 120 }
        ];
    }
}

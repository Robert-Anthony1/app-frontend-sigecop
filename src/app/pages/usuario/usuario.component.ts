import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { IUserRequest } from '../../model/api/request/IUserRequest';
import { ITipoDocumentoResponse } from '../../model/api/response/ITipoDocumentoResponse';
import { IRolResponse } from '../../model/api/response/IRolResponse';
import { RolService } from '../../service/security/rol.service';
import Swal from 'sweetalert2';
import { forkJoin } from 'rxjs';
import { UsuarioService } from '../../service/security/usuario.service';
import { IUserResponse } from '../../model/api/response/IUserResponse';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-usuario',
  imports: [CommonModule, MatTableModule, MatPaginatorModule,
    NgxDatatableModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit {
  rolOption: IRolResponse[] = [];
  usuarioResult: IUserResponse[] = [];
  filter: IUserRequest = {};
  columns: any[] = [];

  //templates
  @ViewChild('accionesTemplate', { static: true }) accionesTemplate!: TemplateRef<any>;
  @ViewChild('colNombreTemplate', { static: true }) colNombreTemplate!: TemplateRef<any>;
  @ViewChild('colDocumentoTemplate', { static: true }) colDocumentoTemplate!: TemplateRef<any>;

  constructor(
    private dialog: MatDialog,
    private rolService: RolService,
    private usuarioService: UsuarioService) { }

  ngOnInit() {
    forkJoin({
      rolResponse: this.rolService.list(),
      usuarioResponse: this.usuarioService.list(this.filter)
    }).subscribe({
      next: ({ rolResponse, usuarioResponse }) => {
        this.rolOption = rolResponse;
        this.usuarioResult = usuarioResponse;

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

  initTable() {
    this.columns = [
      { name: 'Nro.', prop: 'id' },
      { name: 'Nombre Completo', cellTemplate: this.colNombreTemplate },
      { name: 'Rol', prop: 'rol.nombre' },
      { name: 'Documento', cellTemplate: this.colDocumentoTemplate },
      { name: 'Correo', prop: 'correo', },
      { name: 'Acciones', cellTemplate: this.accionesTemplate }
    ];
  }

}

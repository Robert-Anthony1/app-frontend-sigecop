import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SessionService } from '../../service/security/session.service';
import Swal from 'sweetalert2';
import { HTTP_STATUS } from '../../util/constant';
import { StorageService } from '../../service/util/storage.service';
import { CommonModule } from '@angular/common';
import { UserResponse } from '../../model/api/response/UserResponse';
import { Pagina } from '../../model/dto/Pagina';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  paginas: Pagina[] = [];
  user: UserResponse = {};
  isSidebarCollapsed = false;

  constructor(private router: Router, private sessionService: SessionService, private storageService: StorageService) { }

  ngOnInit() {
    setTimeout(() => {
      this.sessionService.infoSession().subscribe(
        (result: UserResponse) => {
          this.user = result;
          this.paginas = result.paginas ?? [];
        },
        (err: any) => {
          switch (err.status) {
            case HTTP_STATUS.UNAUTHORIZED:
              Swal.close();
              Swal.fire({
                icon: 'error',
                title: "Error de validación de sesión, inicie sesión de nuevo porfavor",
                confirmButtonText: "Aceptar",
              }).then((result) => {
                if (result.isConfirmed) {
                  this.logout();
                }
              });
              break;
            default:
              Swal.close();
              Swal.fire({
                icon: 'warning',
                title: '¡Advertencia!',
                text: err.error,
              });
              break;
          }
        }
      );
    });
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  logout() {
    this.storageService.deleteSession();
    this.router.navigate(['/login']);
  }
}

import { AfterViewInit, Component } from '@angular/core';
import { deleteSession } from '../../util/methods';
import { Router } from '@angular/router';
import { SessionService } from '../../service/session.service';
import Swal from 'sweetalert2';
import { HTTP_STATUS } from '../../util/constant';
import { IUserResponse } from '../../model/api/response/IUserResponse';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit {
  paginas = [];
  user = {
    name: 'Juan Pérez',
    role: 'Administrador'
  };

  constructor(private router: Router, private sessionService: SessionService) { }

  ngAfterViewInit() {
  this.sessionService.infoSession().subscribe(
      (result: IUserResponse) => {
        console.log(result);
      },
      (err: any) => {
        switch (err.status) {
          case HTTP_STATUS.UNAUTHORIZED:
            Swal.close();
            Swal.fire({
              icon: 'error',
              title: '¡Error!',
              text: err.error,
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
  }

  logout() {
    deleteSession();
    this.router.navigate(['/login']);
  }
}

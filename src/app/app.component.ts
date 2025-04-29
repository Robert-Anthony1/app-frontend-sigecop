import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoadingService } from './service/loading.service';
import { CommonModule } from '@angular/common';
import { verificarSession } from './util/methods';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  constructor(private router: Router, public loadingService: LoadingService) { }

  ngAfterViewInit() {

    if (typeof window !== 'undefined' && window.localStorage) {
      if (verificarSession()) {
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/login']);
      }
    }
  }
}

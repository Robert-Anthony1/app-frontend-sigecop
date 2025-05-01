import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoadingService } from './service/loading.service';
import { CommonModule } from '@angular/common';
import { StorageService } from './service/storage.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private router: Router, public loadingService: LoadingService, private storageService: StorageService) {

  }

  ngOnInit() {
    let verifySession = this.storageService.verificarSession();
    if (verifySession == true) {
    //  this.router.navigate(['/home']);
    } else if (verifySession == false) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/loading']);
    }
  }
}

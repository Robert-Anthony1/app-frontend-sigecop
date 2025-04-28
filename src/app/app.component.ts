import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
    const estaLogueado = localStorage.getItem('token') !== null;

    if (estaLogueado) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}

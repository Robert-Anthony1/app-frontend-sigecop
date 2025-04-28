import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) { }

  onSubmit() {
    console.log('Correo:', this.email);
    console.log('Contraseña:', this.password);
    this.router.navigate(['/home']);
  }
}
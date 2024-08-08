import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports:[CommonModule,RouterOutlet,RouterLink,ReactiveFormsModule,NavbarComponent,FooterComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router) { }

  onLogin(): void {
    // Aquí puedes poner tu lógica de autenticación. Por ahora, solo redirigimos.
    this.router.navigate(['/cursos']);
  }
}

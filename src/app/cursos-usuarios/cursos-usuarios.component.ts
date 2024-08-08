import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-cursos-usuarios',
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterLink,RouterModule,NavbarComponent,FooterComponent],
  templateUrl: './cursos-usuarios.component.html',
  styleUrl: './cursos-usuarios.component.css'
})
export class CursosUsuariosComponent {

}

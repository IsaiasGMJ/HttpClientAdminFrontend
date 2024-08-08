import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-crear-cursos',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, FooterComponent, NavbarComponent],
  templateUrl: './crear-cursos.component.html',
  styleUrl: './crear-cursos.component.css'
})
export class CrearCursosComponent {

}

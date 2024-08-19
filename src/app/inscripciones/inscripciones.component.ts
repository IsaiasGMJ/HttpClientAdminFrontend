import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { EnrollmentsService } from '../services/enrollments.service'; 
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../services/usuarios.service';
import { CursoService } from '../services/curso.service';
import { Enrollment } from './enrollment.model';

@Component({
  selector: 'app-inscripciones',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent, FooterComponent],
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.css']
})
export class InscripcionesComponent implements OnInit {
  users: any[] = [];
  courses: any[] = [];
  selectedUser!: string;
  selectedCourse!: string;
  enrollments$: Observable<Enrollment[]>; // Solo declaración

  constructor(private enrollmentsService: EnrollmentsService, private usuariosService: UsuariosService, private cursoService: CursoService) {
    this.enrollments$ = this.enrollmentsService.getEnrollments(); // Inicialización en el constructor
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadCourses();
    this.loadEnrollments(); // Cargar inscripciones en la inicialización
  }

  loadUsers(): void {
    this.usuariosService.getUsers().subscribe(users => this.users = users);
  }

  loadCourses(): void {
    this.cursoService.getCursos().subscribe(courses => this.courses = courses);
  }

  loadEnrollments(): void {
    this.enrollments$ = this.enrollmentsService.getEnrollments(); // Actualiza el observable con los datos
  }

  enrollUser() {
    if (this.selectedUser && this.selectedCourse) {
      this.enrollmentsService.createEnrollment(this.selectedUser, this.selectedCourse).subscribe(
        response => {
          console.log('Enrollment created successfully', response);
        },
        error => {
          console.error('Error creating enrollment', error);
        }
      );
    } else {
      console.error('User or Course not selected');
    }
  }
  

  deleteEnrollment(id: string) {
    this.enrollmentsService.deleteEnrollment(id).subscribe(
        response => {
            console.log('Enrollment deleted successfully', response);
            this.loadEnrollments(); // Recargar la lista de inscripciones
        },
        error => {
            console.error('Error deleting enrollment', error);
        }
    );
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { EnrollmentsService } from '../services/enrollments.service'; // Asegúrate de crear este servicio
import { Observable } from 'rxjs';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuariosService } from '../services/usuarios.service';
import { CursoService } from '../services/curso.service';

@Component({
  selector: 'app-inscripciones',
  standalone: true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule, NavbarComponent, FooterComponent,FormsModule],
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.css']
})
export class InscripcionesComponent implements OnInit {
deleteEnrollment(arg0: any) {
throw new Error('Method not implemented.');
}
  users: any[] = [];
  courses: any[] = [];
  selectedUser!: string;
  selectedCourse!: string;
  enrollments$!: Observable<any[]>;

  constructor(private enrollmentsService: EnrollmentsService, private usuariosService: UsuariosService, private cursoService: CursoService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadCourses();
    this.loadEnrollments();
  }

  loadUsers(): void {
    this.usuariosService.getUsers().subscribe(users => this.users = users);
  }

  loadCourses(): void {
    this.cursoService.getCursos().subscribe(courses => this.courses = courses);
  }

  loadEnrollments(): void {
    this.enrollments$ = this.enrollmentsService.getEnrollments();
  }

  enrollUser(): void {
    this.enrollmentsService.createEnrollment(this.selectedUser, this.selectedCourse).subscribe(() => {
      this.loadEnrollments();
    });
  }
}

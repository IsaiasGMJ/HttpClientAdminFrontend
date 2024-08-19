import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { EnrollmentsService } from '../services/enrollments.service'; 
import { Observable } from 'rxjs';
import { RouterLink, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosService } from '../services/usuarios.service';
import { CursoService } from '../services/curso.service';
import { Enrollment } from './enrollment.model';

@Component({
  selector: 'app-inscripciones',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,
     RouterModule, FormsModule, 
     NavbarComponent, FooterComponent,NgClass,
     RouterLink],
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.css']
})
export class InscripcionesComponent implements OnInit {
  inscripcionForm: FormGroup;
  users: any[] = [];
  courses: any[] = [];
  selectedUser: string | undefined;
  selectedCourse: string | undefined;
  enrollments$: Observable<Enrollment[]> | undefined; // Solo declaración

constructor(private fb: FormBuilder , private enrollmentsService: EnrollmentsService, private usuariosService: UsuariosService, private cursoService: CursoService) {
      this.inscripcionForm = this.fb.group({// Inicialización en el constructor
        user_id: ['', Validators.required],
        course_id:['', Validators.required]
      });
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

  // enrollUser() {
  //   console.log('hola puto si activaste esto:v');
  //       if (this.selectedUser && this.selectedCourse) {
  //     this.enrollmentsService.createEnrollment(this.selectedUser, this.selectedCourse).subscribe(
  //       response => {
  //         console.log('Enrollment created successfully', response);
  //       },
  //       error => {
  //         console.error('Error creating enrollment', error);
  //       }
  //     );
  //   } else {
  //     console.error('User or Course not selected');
  //   }
  // }

  onSubmit() {
    if(this.inscripcionForm.valid){
      this.enrollmentsService.createEnrollment(
        this.inscripcionForm.value.user_id, 
        this.inscripcionForm.value.course_id).subscribe(
          response => {
            console.log('Enrollment created successfully', response);
            this.loadEnrollments();
            },
        );
      }
    }

enrollUser() {
  console.log('Selected User:', this.selectedUser);
  console.log('Selected Course:', this.selectedCourse);
  if (this.selectedUser && this.selectedCourse) {
    this.enrollmentsService.createEnrollment(this.selectedUser, this.selectedCourse).subscribe(
      response => {
        console.log('Enrollment created successfully', response);
        this.loadEnrollments();
      },
      error => {
        console.error('Error creating enrollment', error);
      }
    );
  } else {
    console.error('User or Course not selected');
  }
}

  //       if (this.selectedUser && this.selectedCourse) {
  //     this.enrollmentsService.createEnrollment(this.selectedUser, this.selectedCourse).subscribe(
  //       response => {
  //         console.log('Enrollment created successfully', response);
  //       },
  //       error => {
  //         console.error('Error creating enrollment', error);
  //       }
  //     );
  //   } else {
  //     console.error('User or Course not selected');
  //   }
  // }
  

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

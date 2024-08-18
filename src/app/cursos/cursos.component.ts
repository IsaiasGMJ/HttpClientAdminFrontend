import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {  Router, RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from '../navbar/navbar.component';
import { CursoService } from '../services/curso.service';
import { jwtDecode } from 'jwt-decode';
// @ts-ignore
import { Dropdown, Collapse, Carousel, initMDB, Ripple, Modal } from "mdb-ui-kit";
import { EnrollmentsService } from '../services/enrollments.service';
// Initialization for ES Users

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [ CommonModule,RouterOutlet, ReactiveFormsModule, FooterComponent, NavbarComponent,RouterLink],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css'
})
export class CursosComponent implements  OnInit {
  cursos:any[]=[];
  modal: any;
  curso: any[]=[];
  selectedCourseId: string | null = null;
  constructor(private cursoService: CursoService,
     private router: Router,
    private enrollmentService:EnrollmentsService){}
  ngOnInit(): void {
    this.cursoService.getCursos().subscribe(data => {
      this.cursos = data;
    });
  }
  ngAfterViewInit() {
   initMDB({ Carousel, Ripple });
   this.modal = new Modal(document.getElementById('confirmSubscriptionModal'));  // Inicializa el modal manualmente
  }
  redirectToLibrary() {
    this.router.navigate(['/miscursos']);
  }
  openModal(courseId: string) {
    this.selectedCourseId = courseId; // Guardar el ID del curso seleccionado
    this.modal.show();
  }
  
  confirmEnrollment() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }
  
    const decodedToken: any = jwtDecode(token);
    const userId = decodedToken.user_id;
  
    if (!userId || !this.selectedCourseId) {
      console.error('No user ID or course ID found');
      return;
    }
  
    this.enrollmentService.createEnrollment(userId, this.selectedCourseId).subscribe(
      response => {
        console.log('Enrollment created successfully', response);
        this.router.navigate(['/miscursos']),
        this.modal.hide();
      },
      error => {
        console.error('Error creating enrollment', error);
      }
    );
  }
}

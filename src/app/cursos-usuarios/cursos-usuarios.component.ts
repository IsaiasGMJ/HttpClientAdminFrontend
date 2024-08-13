import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CursosUsuariosService } from '../services/cursos-usuarios.service';
// @ts-ignore
import { Dropdown, Collapse, Carousel, initMDB, Ripple, Modal } from "mdb-ui-kit";


@Component({
  selector: 'app-cursos-usuarios',
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterLink,RouterModule,NavbarComponent,FooterComponent],
  templateUrl: './cursos-usuarios.component.html',
  styleUrl: './cursos-usuarios.component.css'
})


export class CursosUsuariosComponent implements OnInit {
  userCourses: any[] = [];

  constructor(private cursosUsuariosService : CursosUsuariosService) { }
  ngOnInit(): void {
    this.cursosUsuariosService.getUserCourses().subscribe(courses => {
      this.userCourses = courses;
    });
  }

  // Método para eliminar una inscripción
  deleteCourse(courseId: string): void {
    this.cursosUsuariosService.deleteUserCourse(courseId).subscribe(response => {
      this.userCourses = this.userCourses.filter(course => course._id !== courseId);
    });
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CursosUsuariosService } from '../services/cursos-usuarios.service';
// @ts-ignore
import { Dropdown, Collapse, Carousel, initMDB, Ripple, Modal } from "mdb-ui-kit";
import { jwtDecode } from 'jwt-decode';


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
    const user_id = this.getUserIdFromToken();

    if (user_id) {
      this.cursosUsuariosService.getUserCourses(user_id).subscribe(courses => {
        this.userCourses = courses;
      });
    } else {
      console.error('User ID not found');
    }
  }

  private getUserIdFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.user_id; // Asegúrate de que `user_id` es el campo correcto en tu token
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  deleteCourse(courseId: string): void {
    this.cursosUsuariosService.deleteUserCourse(courseId).subscribe(() => {
      this.userCourses = this.userCourses.filter(course => course._id !== courseId);
    }, error => {
      console.error('Error eliminando la inscripción:', error);
    });
  }
  
}
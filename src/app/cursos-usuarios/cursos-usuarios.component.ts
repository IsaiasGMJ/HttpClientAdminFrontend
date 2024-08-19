import { Component, OnInit } from '@angular/core';
import { CursosUsuariosService } from '../services/cursos-usuarios.service';
import { Cursos } from '../cursos-usuarios/cursos.model';
import { jwtDecode } from 'jwt-decode';
import { CommonModule, NgClass } from '@angular/common';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-cursos-usuarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule, NavbarComponent, FooterComponent, NgClass, RouterLink],
  templateUrl: './cursos-usuarios.component.html',
  styleUrls: ['./cursos-usuarios.component.css']
})
export class CursosUsuariosComponent implements OnInit {
  userCourses: Cursos[] = [];
  Cursos: Cursos[] = [];

  constructor(private cursosUsuariosService: CursosUsuariosService) {}

  private getUserIdFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.user_id;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  ngOnInit(): void {
    const user_id = this.getUserIdFromToken();
    if (user_id) {
      this.cursosUsuariosService.getUserCourses(user_id).subscribe((courses: Cursos[]) => {
        this.userCourses = courses;
      });
    } else {
      console.error('User ID not found');
    }
  }

  deleteCourse(courseId: string): void {
    this.cursosUsuariosService.deleteUserCourse(courseId).subscribe(() => {
      this.userCourses = this.userCourses.filter(course => course.course_id._id !== courseId);
    }, error => {
      console.error('Error eliminando la inscripción:', error);
    });
  }
}

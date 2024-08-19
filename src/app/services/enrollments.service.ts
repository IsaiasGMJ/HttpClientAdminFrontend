import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { CursosComponent } from '../cursos/cursos.component';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentsService {
  private apiUrl = 'http://localhost:3000/enrollments';

  constructor(private http: HttpClient) {}


  // Obtener todas las inscripciones
  getEnrollments(): Observable<any[]> {
        const headers = new HttpHeaders({
      'x-auth-token': `${localStorage.getItem('token')}`
    });
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  // Obtener todos los usuarios
  getUsers(): Observable<any[]> {
    const headers = new HttpHeaders({
      'x-auth-token': `${localStorage.getItem('token')}`
    });
    return this.http.get<any[]>('http://localhost:3000/users', { headers });
  }

  // Obtener todos los cursos
  getCourses(): Observable<any[]> {
    const headers = new HttpHeaders({
      'x-auth-token': `${localStorage.getItem('token')}`
    });
    return this.http.get<any[]>('http://localhost:3000/courses', { headers });
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


  // Crear una nueva inscripción
  createEnrollment(userId: string, courseId: string): Observable<any> {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }

  const headers = new HttpHeaders({
    'x-auth-token': `${token}`
  });

  // Ya que userId se recibe como argumento, no es necesario volver a declararlo
  return this.http.post(this.apiUrl, { user_id: userId, course_id: courseId }, { headers });
}


  

  // Eliminar una inscripción existente
  deleteEnrollment(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-auth-token': `${localStorage.getItem('token')}`
    });
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers });
  }
  enrollUser(userId: string, courseId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/enrollments`, { userId, courseId });
}

}

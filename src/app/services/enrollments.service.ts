import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  // Crear una nueva inscripción
  createEnrollment(userId: string, courseId: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-auth-token': `${localStorage.getItem('token')}`
    });
    return this.http.post(this.apiUrl, { user_id: userId, course_id: courseId, headers});
  }
  

  // Eliminar una inscripción existente
  deleteEnrollment(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-auth-token': `${localStorage.getItem('token')}`
    });
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers });
  }
}

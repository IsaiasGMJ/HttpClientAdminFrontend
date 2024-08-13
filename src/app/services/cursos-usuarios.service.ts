import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class CursosUsuariosService {
  private apiUrl = 'http://localhost:3000/user-courses';
  private userId: string | null = null;
  
  constructor(private http: HttpClient) {
    this.userId = this.getUserIdFromToken();
  }

  // Método para obtener el ID del usuario desde el token JWT
  private getUserIdFromToken(): string | null {
    
    const token = localStorage.getItem('token'); // Asumiendo que el token se guarda en localStorage
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken?.userId || null; // Aquí debes ajustar 'userId' al nombre del campo en tu token
    }
    return null;
  }

  // Obtener los cursos del usuario autenticado
  getUserCourses(): Observable<any> {
    if (!this.userId) {
      throw new Error('User ID not found in token');
    }
    return this.http.get<any>(`${this.apiUrl}/${this.userId}`);
  }

  // Eliminar una inscripción
  deleteUserCourse(courseId: string): Observable<any> {
    if (!this.userId) {
      throw new Error('User ID not found in token');
    }
    return this.http.delete(`${this.apiUrl}/${this.userId}/${courseId}`);
  }
}

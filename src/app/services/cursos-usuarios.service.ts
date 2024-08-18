import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CursosUsuariosService {
  private apiUrl = 'http://localhost:3000/user-courses';

  constructor(private http: HttpClient) { }

  // Método para obtener los cursos del usuario
  getUserCourses(user_id:string): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return of([]); // Retorna un observable con una lista vacía en caso de que no haya token
    }

    const headers = new HttpHeaders().set('x-auth-token',token);
    return this.http.get(`${this.apiUrl}/${user_id}`, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching user courses:', error);
        return of([]); // Retorna un observable con una lista vacía en caso de error
      })
    );
  }

  // Método para eliminar un curso del usuario
  deleteUserCourse(courseId: string): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return of({}); // Retorna un observable con un objeto vacío en caso de que no haya token
    }

    const headers = new HttpHeaders().set('x-auth-token',token);
    return this.http.delete(`${this.apiUrl}/${courseId}`, { headers }).pipe(
      catchError(error => {
        console.error('Error deleting user course:', error);
        return of({}); // Retorna un observable con un objeto vacío en caso de error
      })
    );
  }
}

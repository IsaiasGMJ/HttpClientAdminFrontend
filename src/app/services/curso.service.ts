import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private apiUrl = 'http://localhost:3000/courses'; 

  constructor(private http: HttpClient) {}

  getCursos(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      // tap((data: any) => console.log('Cursos obtenidos:', data)), // Añadir log para depuración
      catchError(error => {
        console.error('Error al obtener cursos:', error);
        return of([]); // Retornar un array vacío en caso de error
      })
    );
  }
// Método para eliminar un curso
deleteCourse(courseId: string) {
  const token = localStorage.getItem('token')?? ''; // Obtener el token del localStorage
  const headers = new HttpHeaders({
    'x-auth-token': token // Agregar el token a los headers
  });

  return this.http.delete(`${this.apiUrl}/${courseId}`, { headers });
}

// Método para actualizar un curso
updateCourse(courseId: string, courseData: any) {
  const token = localStorage.getItem('token') ?? ''; // Obtener el token del localStorage
  const headers = new HttpHeaders({
    'x-auth-token': token // Agregar el token a los headers
  });

  return this.http.put(`${this.apiUrl}/${courseId}`, courseData, { headers });
}
}

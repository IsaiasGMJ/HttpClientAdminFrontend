import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrearCursos {
  private apiUrl = 'http://localhost:3000/courses'; 

  constructor(private http: HttpClient) {}

  
 // Método para obtener el token de localStorage
 private getToken(): string | null {
  return localStorage.getItem('token');
}

// Método para crear headers con el token
private createHeaders() {
  const token = this.getToken();
  if (token) {
    return {
      headers: new HttpHeaders({
        'x-auth-token': token
      })
    };
  } else {
    return {};
  }
}

getCourseById(id: string): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/${id}`, this.createHeaders());
}

createCourse(courseData: FormData): Observable<any> {
  return this.http.post<any>(this.apiUrl, courseData, this.createHeaders());
}

updateCourse(id: string, courseData: FormData): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}/${id}`, courseData, this.createHeaders());
}

deleteCourse(id: string): Observable<any> {
  return this.http.delete<any>(`${this.apiUrl}/${id}`, this.createHeaders());
}

obtenerCurso(id: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/${id}`, this.createHeaders());
}

actualizarCurso(id: string, curso: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}`, curso, this.createHeaders());
}

crearCurso(curso: any): Observable<any> {
  return this.http.post(this.apiUrl, curso, this.createHeaders());
}
}

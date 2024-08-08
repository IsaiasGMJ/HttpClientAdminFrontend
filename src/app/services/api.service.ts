import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000/api'; // URL de tu API en Express

  constructor(private http: HttpClient) { }

  getCourses(): Observable<any> {
    return this.http.get(`${this.apiUrl}/courses`);
  }

  enrollCourse(courseId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/enrollments`, { courseId });
  }

  // Otros métodos según las rutas de tu API
}

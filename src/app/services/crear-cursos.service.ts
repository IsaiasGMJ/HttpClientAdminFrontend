import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrearCursos {
  private apiUrl = 'http://localhost:3000/courses'; 

  constructor(private http: HttpClient) {}

  
  getCourseById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createCourse(courseData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, courseData);
  }

  updateCourse(id: string, courseData: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, courseData);
  }

  deleteCourse(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}

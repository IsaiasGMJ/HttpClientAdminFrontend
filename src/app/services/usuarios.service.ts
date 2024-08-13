import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  // Obtener todos los usuarios
  getUsers(): Observable<any[]> {
    const headers = new HttpHeaders({
      'x-auth-token': `${localStorage.getItem('token')}`
    });
    return this.http.get<any[]>(this.apiUrl, {headers});
  }

  // Crear un nuevo usuario
  createUser(user: any): Observable<any> {
    const headers = new HttpHeaders({
      'x-auth-token': `${localStorage.getItem('token')}`
    });
    return this.http.post<any>(this.apiUrl, user, { headers });
  }

  // Actualizar un usuario existente
  updateUser(id: string, user: any): Observable<any> {
    const headers = new HttpHeaders({
      'x-auth-token': `${localStorage.getItem('token')}`
    });
    return this.http.put<any>(`${this.apiUrl}/${id}`, user, { headers });
  }

  // Eliminar un usuario
  deleteUser(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-auth-token': `${localStorage.getItem('token')}`
    });
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers });
  }
}

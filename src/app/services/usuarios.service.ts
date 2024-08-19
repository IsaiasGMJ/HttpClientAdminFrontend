import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]> {
    const token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({ 'x-auth-token': token });
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  // Crear usuario
  createUser(userData: any): Observable<any> {
    const token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({ 'x-auth-token': token });
    return this.http.post(this.apiUrl, userData, { headers });
  }

  // Actualizar usuario
  updateUser(userId: string, userData: any): Observable<any> {
    const token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({ 'x-auth-token': token });

    // Excluir el campo de contraseña si no se proporciona
    if (!userData.password) {
      delete userData.password;
    }

    return this.http.put(`${this.apiUrl}/${userId}`, userData, { headers });
  }

  // Eliminar usuario
  deleteUser(userId: string): Observable<any> {
    const token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({ 'x-auth-token': token });
    return this.http.delete(`${this.apiUrl}/${userId}`, { headers });
  }
}
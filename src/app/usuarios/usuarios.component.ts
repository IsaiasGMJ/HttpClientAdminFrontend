import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsuariosService } from '../services/usuarios.service';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// @ts-ignore
import { Dropdown, Collapse, initMDB } from 'mdb-ui-kit';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent, ReactiveFormsModule, RouterOutlet],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  userForm: FormGroup;
  users: any[] = [];
  editingUser: any = null;

  constructor(private fb: FormBuilder, private usuariosService: UsuariosService, private http: HttpClient) {
    this.userForm = this.fb.group({
      username: [''],
      email: [''],
      password:[''],
      role: ['']  
    });
  }

  ngOnInit(): void {
    this.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  // Obtener los usuarios desde la API
  getUsers(): Observable<any[]> {
    const headers = new HttpHeaders({
      'x-auth-token': `${localStorage.getItem('token')}`
    });
    return this.http.get<any[]>('http://localhost:3000/users', { headers });
  }

  // Crear o actualizar usuario
  onSubmit() {
    const formData = this.userForm.getRawValue(); // Obtiene el valor actual del formulario, incluso si el campo 'password' está deshabilitado.
    if (this.editingUser) {
      this.usuariosService.updateUser(this.editingUser._id, formData).subscribe(() => {
        this.getUsers().subscribe(data => this.users = data);
        this.resetForm();
      });
    } else {
      this.usuariosService.createUser(formData).subscribe(() => {
        this.getUsers().subscribe(data => this.users = data);
        this.resetForm();
      }, error => {
        console.error('Error creating user:', error);
        // Manejar el error aquí, por ejemplo mostrando un mensaje al usuario
      });
    }
  }

  // Editar usuario
  editUser(user: any) {
    this.editingUser = user;
    this.userForm.patchValue({
      username: user.username,
      email: user.email,
      role: user.role,
    });
  
    // Deshabilitar el campo de la contraseña solo durante la edición
    this.userForm.controls['password'].disable();
  }
  // Eliminar usuario
  deleteUser(id: string) {
    this.usuariosService.deleteUser(id).subscribe(() => {
      this.getUsers().subscribe(data => this.users = data);
    });
  }
  // Resetear el formulario
  resetForm() {
    this.userForm.reset();
    this.editingUser = null;
    this.userForm.controls['password'].enable(); // Habilitar el campo de contraseña
  }

  ngAfterViewInit() {
    initMDB({ Dropdown, Collapse });
  }
}

import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CursosComponent } from './cursos/cursos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CrearCursosComponent } from './crear-cursos/crear-cursos.component';
import { InscripcionesComponent } from './inscripciones/inscripciones.component';
import { CursosUsuariosComponent } from './cursos-usuarios/cursos-usuarios.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cursos', component: CursosComponent },
  { path: 'usuarios', component: UsuariosComponent},
  { path: 'crearcursos', component: CrearCursosComponent},
  { path: 'inscripciones', component: InscripcionesComponent },
  { path: 'miscursos', component: CursosUsuariosComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];


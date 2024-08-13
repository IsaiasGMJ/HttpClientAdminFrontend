import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CursosComponent } from './cursos/cursos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CrearCursosComponent } from './crear-cursos/crear-cursos.component';
import { InscripcionesComponent } from './inscripciones/inscripciones.component';
import { CursosUsuariosComponent } from './cursos-usuarios/cursos-usuarios.component';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cursos', component: CursosComponent, canActivate:[AuthGuard]}, //inicio
  { path: 'usuarios', component: UsuariosComponent, canActivate:[AuthGuard]}, //registro
  { path: 'crearcursos', component: CrearCursosComponent, canActivate:[AuthGuard]},
  { path: 'inscripciones', component: InscripcionesComponent,canActivate:[AuthGuard]},
  { path: 'miscursos', component: CursosUsuariosComponent, canActivate:[AuthGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' } //login
];


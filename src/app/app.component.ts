import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CursosComponent } from "./cursos/cursos.component";
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AuthInterceptor } from './auth.Interceptor';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterModule, CommonModule,
    LoginComponent, HttpClientModule,
     CursosComponent,NavbarComponent,
     FooterComponent],
     providers: [
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent{
  title = 'HttpClientAdmin';

}

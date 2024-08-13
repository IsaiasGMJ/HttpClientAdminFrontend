// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    console.log('AuthGuard: checking if user is logged in');
    if (this.authService.isLoggedIn()) {
      console.log('AuthGuard: user is logged in');
      console.log(localStorage);
      return true;
    } else {
      console.log('AuthGuard: user is not logged in, redirecting to login');
      this.router.navigate(['/login']);
      return false;
    }
  }  
  redirectToLibrary() {
    console.log('Redirecting to /miscursos');
    this.router.navigate(['/miscursos']);
  }
}

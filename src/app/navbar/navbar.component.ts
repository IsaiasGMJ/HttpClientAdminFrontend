import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../services/auth.service';
// @ts-ignore
import { Dropdown, Collapse, initMDB } from 'mdb-ui-kit';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterModule, RouterLink, CommonModule],
 templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements AfterViewInit {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
  
  ngAfterViewInit() {
    initMDB({ Dropdown, Collapse });
  }
}

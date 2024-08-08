import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
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
  constructor() {}

  
  ngAfterViewInit() {
    initMDB({ Dropdown, Collapse });
  }
}

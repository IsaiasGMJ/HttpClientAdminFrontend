import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from '../navbar/navbar.component';
// @ts-ignore
import { Carousel, initMDB, Ripple } from "mdb-ui-kit";
// Initialization for ES Users

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, FooterComponent, NavbarComponent,RouterLink],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css'
})
export class CursosComponent {
  constructor(){}

  ngAfterViewInit() {
   initMDB({ Carousel, Ripple });
  }

}

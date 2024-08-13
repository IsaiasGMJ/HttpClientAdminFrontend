import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {  Router, RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from '../navbar/navbar.component';
import { CursoService } from '../services/curso.service';
// @ts-ignore
import { Dropdown, Collapse, Carousel, initMDB, Ripple, Modal } from "mdb-ui-kit";
// Initialization for ES Users

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [ CommonModule,RouterOutlet, ReactiveFormsModule, FooterComponent, NavbarComponent,RouterLink],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css'
})
export class CursosComponent implements  OnInit {
  cursos:any[]=[];
  modal: any;
  curso: any[]=[];
  constructor(private cursoService: CursoService, private router: Router){}
  ngOnInit(): void {
    this.cursoService.getCursos().subscribe(data => {
      this.cursos = data;
    });
  }
  ngAfterViewInit() {
   initMDB({ Carousel, Ripple });
   this.modal = new Modal(document.getElementById('confirmSubscriptionModal'));  // Inicializa el modal manualmente
  }
  redirectToLibrary() {
    this.router.navigate(['/miscursos']);
  }
  openModal() {
    this.modal.show();
    console.log("Modal picado")
  }
}

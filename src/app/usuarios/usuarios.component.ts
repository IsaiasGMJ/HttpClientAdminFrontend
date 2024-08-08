import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
  // @ts-ignore
  import { Dropdown, Collapse, initMDB } from 'mdb-ui-kit';
@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {

  ngAfterViewInit() {
    initMDB({ Dropdown, Collapse });
  }
}

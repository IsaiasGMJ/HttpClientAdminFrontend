import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosUsuariosComponent } from './cursos-usuarios.component';

describe('CursosUsuariosComponent', () => {
  let component: CursosUsuariosComponent;
  let fixture: ComponentFixture<CursosUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursosUsuariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CursosUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

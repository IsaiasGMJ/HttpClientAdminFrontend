import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { CrearCursos } from '../services/crear-cursos.service';
// @ts-ignore
import { Dropdown, Collapse, initMDB } from 'mdb-ui-kit';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-crear-cursos',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, ReactiveFormsModule, NavbarComponent, FooterComponent],
  templateUrl: './crear-cursos.component.html',
  styleUrls: ['./crear-cursos.component.css']
})
export class CrearCursosComponent implements OnInit {
  courseForm: FormGroup;
  isEditing: boolean = false;
  courseId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private crearCursos: CrearCursos,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.courseForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(0)]],
      teacher_id: ['', [Validators.required]],
      image: [null, [Validators.required]],
      status: ['Active', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // Check if we are in edit mode by looking at the route params
    this.courseId = this.route.snapshot.paramMap.get('id');
    if (this.courseId) {
      this.isEditing = true;
      this.loadCourseData(this.courseId);
    }
  }

  ngAfterViewInit() {
    initMDB({ Dropdown, Collapse });
  }

  loadCourseData(courseId: string) {
    this.crearCursos.getCourseById(courseId).subscribe(course => {
      this.courseForm.patchValue({
        name: course.name,
        description: course.description,
        price: course.price,
        teacher_id: course.teacher_id,
        status: course.status
        // Nota: La imagen no se puede pre-cargar en un input file, por lo que este campo se deja vacío
      });
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.courseForm.patchValue({
        image: file
      });
    }
  }

  onSubmit() {
    if (this.courseForm.valid) {
      const formData = new FormData();
      for (const key in this.courseForm.value) {
        formData.append(key, this.courseForm.value[key]);
      }

      if (this.isEditing && this.courseId) {
        this.crearCursos.updateCourse(this.courseId, formData).subscribe(
          (response) => {
            console.log('Curso actualizado exitosamente', response);
            this.router.navigate(['/cursos']);
          },
          (error) => {
            console.error('Error al actualizar el curso', error);
          }
        );
      } else {
        this.crearCursos.createCourse(formData).subscribe(
          (response) => {
            console.log('Curso creado exitosamente', response);
            this.router.navigate(['/cursos']);
          },
          (error) => {
            console.error('Error al crear el curso', error);
          }
        );
      }
    }
  }

  onDelete() {
    if (this.courseId) {
      this.crearCursos.deleteCourse(this.courseId).subscribe(
        (response) => {
          console.log('Curso eliminado exitosamente', response);
          this.router.navigate(['/cursos']);
        },
        (error) => {
          console.error('Error al eliminar el curso', error);
        }
      );
    }
  }
}

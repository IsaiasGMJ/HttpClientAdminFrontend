import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { CrearCursos } from '../services/crear-cursos.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
// @ts-ignore
import { Dropdown, Collapse, initMDB } from 'mdb-ui-kit';
import { CursoService } from '../services/curso.service';
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
  cursoId: string | null = null;
  curso: any = {};
  selectedFile: any;

  constructor(
    private fb: FormBuilder,
    private crearCursos: CrearCursos,
    private router: Router,
    private route: ActivatedRoute,
    private cursoService:CursoService
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
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file; // Asegúrate de que se está asignando correctamente
      this.courseForm.patchValue({
        image: file
      });
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



  guardarCurso(): void {
   console.log('Método guardarCurso llamado');
  if (this.cursoId) {
    // Lógica para actualizar el curso existente
    this.crearCursos.actualizarCurso(this.cursoId, this.curso).subscribe(() => {
      // Acciones después de actualizar, como redirigir
    });
  } else {
    // Lógica para crear un nuevo curso
    this.crearCursos.crearCurso(this.curso).subscribe(() => {
      // Acciones después de crear, como redirigir
    });
  }
  }

  // onSubmit() {
  //   if (this.courseForm.valid) {
  //     const formData = new FormData();
  //     for (const key in this.courseForm.value) {
  //       formData.append(key, this.courseForm.value[key]);
  //     }

  //     if (this.isEditing && this.courseId) {
  //       this.crearCursos.updateCourse(this.courseId, formData).subscribe(
  //         (response) => {
  //           console.log('Curso actualizado exitosamente', response);
  //           this.router.navigate(['/cursos']);
  //         },
  //         (error) => {
  //           console.error('Error al actualizar el curso', error);
  //         }
  //       );
  //     } else {
  //       this.crearCursos.createCourse(formData).subscribe(
  //         (response) => {
  //           console.log('Curso creado exitosamente', response);
  //           this.router.navigate(['/cursos']);
  //         },
  //         (error) => {
  //           console.error('Error al crear el curso', error);
  //         }
  //       );
  //     }
  //   }
  // }
  onSubmit(): void {
    if (this.courseForm.valid) {
      // console.log('Formulario válido');
      const courseData = new FormData();
      courseData.append('name', this.courseForm.get('name')?.value || '');
      courseData.append('description', this.courseForm.get('description')?.value || '');
      courseData.append('price', this.courseForm.get('price')?.value || '');
      courseData.append('teacher_id', this.courseForm.get('teacher_id')?.value || '');
      courseData.append('status', this.courseForm.get('status')?.value || '');
    
      // Solo añadir la imagen si se ha seleccionado una nueva
      if (this.selectedFile) {
        courseData.append('image', this.selectedFile);
      }
    
      if (this.isEditing && this.courseId) {
        this.cursoService.updateCourse(this.courseId, courseData).subscribe(
          response => {
            console.log('Curso actualizado con éxito', response);
            this.router.navigate(['/cursos']);
          },
          error => {
            console.error('Error al actualizar el curso', error);
          }
        );
      } else {
        this.crearCursos.createCourse(courseData).subscribe(

          response => {
            // console.log('Curso creado con éxito', response);
            this.router.navigate(['/cursos']);
          },
          error => {
            console.error('Error al crear el curso', error);
          }
        );
      }
    } else {
      console.error('Formulario inválido');
    }
  }
  

  onDelete() {
    if (this.courseId) {
      this.crearCursos.deleteCourse(this.courseId).subscribe(
        (response) => {
          // console.log('Curso eliminado exitosamente', response);
          this.router.navigate(['/cursos']);
        },
        (error) => {
          console.error('Error al eliminar el curso', error);
        }
      );
    }
  }
  eliminarCurso(courseId: string) {
    this.cursoService.deleteCourse(courseId).subscribe(
      response => {
        console.log('Curso eliminado:', response);
      },
      error => {
        console.error('Error al eliminar el curso', error);
      }
    );
  }

  actualizarCurso(courseId: string, courseData: any) {
    this.cursoService.updateCourse(courseId, courseData).subscribe(
      response => {
        console.log('Curso actualizado:', response);
      },
      error => {
        console.error('Error al actualizar el curso', error);
      }
    );
  }
}

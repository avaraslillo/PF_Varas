import { ChangeDetectorRef, Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { EMPTY, Observable, Subscription, map } from 'rxjs';
import { ServicioInscripcionesService } from '../../../core/services/servicio-inscripciones.service';
import { CourseActions } from '../courses/store/course.actions';
import { CourseState } from '../courses/store/course.reducer';
import { selectCourses } from '../courses/store/course.selector';
import { ICourse } from '../models/course.model';
import { IInscription, IInscriptionForm } from '../models/inscription.model';
import { IStudent } from '../models/student.model';
import { StudentActions } from '../students-page/store/student.actions';
import { StudentState } from '../students-page/store/student.reducer';
import { selectStudents } from '../students-page/store/student.selector';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrl: './inscriptions.component.css'
})
export class InscriptionsComponent implements OnInit, OnDestroy{

  displayedColumns=['id','nombre_estudiante','nombre_curso','acciones'];

  estudiantes: IStudent[] = [];
  cursos: ICourse[] = [];
  inscripciones: IInscription[] = [];

  isCourseSelectOpen: boolean = false;
  isStudentSelectOpen: boolean = false;


   inscriptionForm = new FormGroup<IInscriptionForm>({
    course: new FormControl<ICourse | null>(null, Validators.required),
    student: new FormControl<IStudent | null>(null, Validators.required),
  });

  observableInscripciones: Observable<IInscription[]> = EMPTY;
  private subscriptionObservable: Subscription = new Subscription();
  dataSource: MatTableDataSource<IInscription>=new MatTableDataSource<IInscription>(this.inscripciones);

  observableCursos!: Observable<ICourse[]>;
  observableEstudiantes!: Observable<IStudent[]>;
  store: any;

  constructor(private storeEstudiantes: Store<{ studentState: StudentState }>,
              private storeCursos: Store<{ courseState: CourseState }>, 
              private servicioInscripciones: ServicioInscripcionesService,
            private renderer: Renderer2,
            private cd: ChangeDetectorRef) {
                //this.observableCursos = this.store.pipe(select(selectCourses));
                //this.observableEstudiantes = this.store.pipe(select(selectStudents));

  }

  ngOnInit(){

    this.loadCourses();
    this.loadStudents();
    this.loadInscriptions();
  }

  ngOnDestroy(): void {
    if (this.subscriptionObservable) {
      this.subscriptionObservable.unsubscribe();
    }
  }

  loadingCourses!: boolean;
  loadCourses(){
    this.loadingCourses=true;
    this.storeCursos.dispatch(CourseActions.loadCourses());
    this.observableCursos=this.storeCursos.select(selectCourses);
    this.observableCursos.subscribe(data=>{
      this.cursos=(data ? data : []);
      this.loadingCourses=false;
    });
  }

  loadingStudents!: boolean;
  loadStudents(){
    this.loadingStudents;
    this.storeEstudiantes.dispatch(StudentActions.loadStudents());
    this.observableEstudiantes=this.storeEstudiantes.select(selectStudents);
    this.observableEstudiantes.subscribe(data=>{
      this.estudiantes=(data ? data : []);
      this.loadingStudents=false;
    });
  }

  loadInscriptions(){
    this.observableInscripciones=this.servicioInscripciones.obtenerlistadoInscripciones().pipe(
      map((result: any) => result as IInscription[])
    );

    this.observableInscripciones.subscribe({
      next:(result: IInscription[])=>{
        this.inscripciones=(result ? result : []);
        this.dataSource = new MatTableDataSource<IInscription>(this.inscripciones);
      },
      error:(err)=>{
        console.log(err)
      },
      complete:()=>{
        this.ngOnDestroy();
      }
    })
  }

  crearInscripcion() {
    
    this.servicioInscripciones.agregarInscripcion(this.inscriptionForm.value).subscribe(() => {
      this.loadInscriptions();
      // No es necesario hacer nada aquí ya que el pipe actualizará automáticamente la lista
    });
  }
  eliminarInscripcion(id: string){
    if(confirm('¿Está seguro de eliminar la inscripción seleccionada?')){
      this.servicioInscripciones.eliminarInscripcion(id).subscribe(() => {
        this.loadInscriptions();
      });
    }

  }

  toggleCourseSelect() {
    this.isCourseSelectOpen = !this.isCourseSelectOpen;
  }

  toggleStudentSelect() {
    this.isStudentSelectOpen = !this.isStudentSelectOpen;
  }

  trackByFn(index: any, item: { id: any; }) {
    return item.id; // O el identificador único de tus opciones
  }

  

  /*onDropdownOpened(select: MatSelect) {
    if (!select.panelOpen) {
      select.close();
    }
  }*/


}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Store, select } from '@ngrx/store';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { ServicioCursosService } from '../../../core/services/servicio-cursos.service';
import { selectUser } from '../../auth/store/auth.selector';
import { CoursesDialogComponent } from '../courses-dialog/courses-dialog.component';
import { ICourse } from '../models/course.model';
import { IUser } from '../models/user.model';
import { CourseActions } from './store/course.actions';
import { CourseState } from './store/course.reducer';
import { selectCourseError, selectCourses, selectIsLoading } from './store/course.selector';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit{
  displayedColumns!: string[];


  

  /*@ViewChild(StudentDialogComponent)
  studentDialogComponent: StudentDialogComponent = new StudentDialogComponent;*/
  listadoCursos: ICourse[] = [];
  dataSource: MatTableDataSource<ICourse>=new MatTableDataSource<ICourse>(this.listadoCursos);
  //subscriptionObservable?: Observable<ICourse>;
  observableCursos:Observable<ICourse[]>=EMPTY;
  private subscriptionObservable: Subscription = new Subscription();
  isLoading$: Observable<boolean>;
  error$: Observable<any>;
  authUser$: Observable<IUser | null>;
  constructor(private store: Store<{ courseState: CourseState }>,
              public courseDialog: MatDialog, 
              private servicioCursos: ServicioCursosService) {
                this.isLoading$ = this.store.pipe(select(selectIsLoading));
                this.observableCursos = this.store.pipe(select(selectCourses));
                this.error$ = this.store.pipe(select(selectCourseError));
                this.authUser$ = this.store.pipe(select(selectUser));
                this.authUser$.subscribe((user)=>{
                  if(user?.profile === "ADMIN"){
                    this.displayedColumns =['codigo_curso', 'nombre_curso','acciones'];
                  }
                  else{
                    this.displayedColumns = ['codigo_curso', 'nombre_curso'];
                  }
                });

    
  }

  ngOnInit(): void {
    this.actualizarListadoCursos();
  }

  ngOnDestroy(): void {
    if (this.subscriptionObservable) {
      this.subscriptionObservable.unsubscribe();
    }
  }

  actualizarListadoCursos(){
    this.store.dispatch(CourseActions.loadCourses());
    
    /*this.observableCursos=this.servicioCursos.obtenerlistadoCursos().pipe(
      map((result: any) => result as ICourse[])
    );
    
    this.observableCursos.subscribe({
      next:(result: ICourse[])=>{
        this.listadoCursos=(result ? result : []);
        this.dataSource = new MatTableDataSource<ICourse>(this.listadoCursos) ;
      },
      error:(err)=>{
        console.log(err)
      },
      complete:()=>{
        this.ngOnDestroy();
      }
    })*/
  }


  abrirFormulario(cursoAEditar?: ICourse ) {
    const dialogRef = this.courseDialog
                          .open(CoursesDialogComponent,{data:cursoAEditar})
                          .afterClosed()
                          .subscribe({
                            next:(result)=>{
                              if(result){
                                
                                if(cursoAEditar){
                                  this.store.dispatch(CourseActions.updateCourse({course: result}));
                                  /*this.servicioCursos.modificarCurso(result).subscribe(() => {
                                    this.actualizarListadoCursos();
                                    // No es necesario hacer nada aquí ya que el pipe actualizará automáticamente la lista
                                  });*/
                                }
                                else{
                                  this.store.dispatch(CourseActions.createCourse({payload: result}));
                                  /*this.servicioCursos.agregarCurso(result).subscribe(() => {
                                    this.actualizarListadoCursos();
                                    // No es necesario hacer nada aquí ya que el pipe actualizará automáticamente la lista
                                  });*/
                                }
                              }
                            },
                            error:(err)=>{
                              console.log(err);
                            }
                          });
  }


  onDeleteCourse(id_eliminar: number){
    if(confirm('¿Está seguro de eliminar al curso seleccionado?')){
      this.store.dispatch(CourseActions.deleteCourse({id:id_eliminar}));
      /*this.servicioCursos.eliminarCurso(id_eliminar).subscribe(() => {
        this.actualizarListadoCursos();
        // No es necesario hacer nada aquí ya que el pipe actualizará automáticamente la lista
      });*/
    }
    
  }
}

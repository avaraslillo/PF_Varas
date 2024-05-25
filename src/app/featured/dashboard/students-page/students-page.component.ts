import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Store, select } from '@ngrx/store';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { ServicioEstudiantesService } from '../../../core/services/servicio-estudiantes.service';
import { AuthState } from '../../auth/store/auth.reducer';
import { selectUser } from '../../auth/store/auth.selector';
import { IStudent } from '../models/student.model';
import { IUser } from '../models/user.model';
import { StudentDialogComponent } from '../student-dialog/student-dialog.component';
import { StudentActions } from './store/student.actions';
import { StudentState } from './store/student.reducer';
import { selectIsLoading, selectStudentError, selectStudents } from './store/student.selector';



@Component({
  selector: 'app-students-page',
  templateUrl: './students-page.component.html',
  styleUrl: './students-page.component.css'
})
export class StudentsPageComponent implements OnInit{
  displayedColumns!: string[];


  

  /*@ViewChild(StudentDialogComponent)
  studentDialogComponent: StudentDialogComponent = new StudentDialogComponent;*/
  listadoEstudiantes: IStudent[] = [];
  dataSource: MatTableDataSource<IStudent>=new MatTableDataSource<IStudent>(this.listadoEstudiantes);
  //subscriptionObservable?: Observable<IStudent>;
  observableEstudiantes:Observable<IStudent[]>=EMPTY;
  private subscriptionObservable: Subscription = new Subscription();
  isLoading$: Observable<boolean>;
  error$: Observable<any>;
  authUser$: Observable<IUser | null>;

  constructor(private store: Store<{ studentState: StudentState }>,
              private storeAuth: Store<{ authState: AuthState }>,
              public studentDialog: MatDialog, 
              private servicioEstudiantes: ServicioEstudiantesService) {
                this.isLoading$ = this.store.pipe(select(selectIsLoading));
                this.observableEstudiantes = this.store.pipe(select(selectStudents));
                this.error$ = this.store.pipe(select(selectStudentError));
                this.authUser$ = this.storeAuth.pipe(select(selectUser));
                this.authUser$.subscribe((user)=>{
                  if(user?.profile === "ADMIN"){
                    this.displayedColumns = ['id','nombres', 'email','acciones'];
                  }
                  else{
                    this.displayedColumns = ['id','nombres', 'email'];
                  }
                });

  }

  ngOnInit(): void {

    this.actualizarListadoEstudiantes();
  }

  ngOnDestroy(): void {
    if (this.subscriptionObservable) {
      this.subscriptionObservable.unsubscribe();
    }
  }

  actualizarListadoEstudiantes(){
    this.store.dispatch(StudentActions.loadStudents());
  }

  abrirFormulario(usuarioAEditar?: IStudent ) {
    const dialogRef = this.studentDialog
                          .open(StudentDialogComponent,{data:usuarioAEditar})
                          .afterClosed()
                          .subscribe({
                            next:(result)=>{
                              if(result){
                                result.date=new Date();
                                if(usuarioAEditar){
                                  result.id=usuarioAEditar.id;
                                  if(usuarioAEditar.id){
                                    this.store.dispatch(StudentActions.updateStudent({student: result}));
                                  }
                                }
                                else{
                                
                                    this.store.dispatch(StudentActions.createStudent({payload: result}));
                                }
                              }
                            },
                            error:(err)=>{
                              console.log(err);
                            }
                          });
  }


  onDeleteUser(id_eliminar: number){
    if(confirm('¿Está seguro de eliminar al usuario seleccionado?')){
      this.store.dispatch(StudentActions.deleteStudent({id:id_eliminar}));
    }
    
  }
}
function subscribe(arg0: { next: (result: IStudent[]) => void; error: (err: any) => void; complete: () => void; }) {
  throw new Error('Function not implemented.');
}


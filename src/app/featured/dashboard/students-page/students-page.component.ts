import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServicioEstudiantesService } from '../../../core/services/servicio-estudiantes.service';
import { IStudent } from '../models/student.model';
import { StudentDialogComponent } from '../student-dialog/student-dialog.component';



@Component({
  selector: 'app-students-page',
  templateUrl: './students-page.component.html',
  styleUrl: './students-page.component.css'
})
export class StudentsPageComponent implements OnInit{
  displayedColumns: string[] = ['id', 'nombres', 'email','acciones'];


  

  /*@ViewChild(StudentDialogComponent)
  studentDialogComponent: StudentDialogComponent = new StudentDialogComponent;*/
  listadoEstudiantes: IStudent[] = [];
  dataSource: MatTableDataSource<IStudent>=new MatTableDataSource<IStudent>(this.listadoEstudiantes);
  //subscriptionObservable?: Observable<IStudent>;
  observableEstudiantes:Observable<IStudent[]>=EMPTY;
  private subscriptionObservable: Subscription = new Subscription();
  constructor(public studentDialog: MatDialog, private servicioEstudiantes: ServicioEstudiantesService) {

    
  }

  ngOnInit(): void {
    this.observableEstudiantes=this.servicioEstudiantes.obtenerListadoEstudiantes().pipe(
      map((result: any) => result as IStudent[])
    );
    
    this.observableEstudiantes.subscribe({
      next:(result: IStudent[])=>{
        this.listadoEstudiantes=(result ? result : []);
        this.dataSource = new MatTableDataSource<IStudent>(this.listadoEstudiantes) ;
      },
      error:(err)=>{
        console.log(err)
      },
      complete:()=>{
        this.ngOnDestroy();
      }
    })
  }

  ngOnDestroy(): void {
    if (this.subscriptionObservable) {
      this.subscriptionObservable.unsubscribe();
    }
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
                                  this.observableEstudiantes=this.servicioEstudiantes.modificarEstudiante(result).pipe(
                                    map((result: any) => result as IStudent[])
                                  );
                                }
                                else{
                                  this.observableEstudiantes=this.servicioEstudiantes.agregarEstudiante(result).pipe(
                                    map((result: any) => result as IStudent[])
                                  ); //this.listadoEstudiantes.push(result);
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
      this.observableEstudiantes=this.servicioEstudiantes.eliminarEstudiante(id_eliminar).pipe(
        map((result: any) => result as IStudent[])
      )
    }
    
  }
}
function subscribe(arg0: { next: (result: IStudent[]) => void; error: (err: any) => void; complete: () => void; }) {
  throw new Error('Function not implemented.');
}


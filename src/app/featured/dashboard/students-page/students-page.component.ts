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
    this.actualizarListadoEstudiantes();
  }

  ngOnDestroy(): void {
    if (this.subscriptionObservable) {
      this.subscriptionObservable.unsubscribe();
    }
  }

  actualizarListadoEstudiantes(){

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
                                  this.servicioEstudiantes.modificarEstudiante(result).subscribe(() => {
                                    this.actualizarListadoEstudiantes();
                                    // No es necesario hacer nada aquí ya que el pipe actualizará automáticamente la lista
                                  });
                                }
                                else{
                                  result.id=Number(this.listadoEstudiantes[this.listadoEstudiantes.length-1].id)+1;
                                  this.servicioEstudiantes.agregarEstudiante(result).subscribe(() => {
                                    this.actualizarListadoEstudiantes();
                                    // No es necesario hacer nada aquí ya que el pipe actualizará automáticamente la lista
                                  });
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
      this.servicioEstudiantes.eliminarEstudiante(id_eliminar).subscribe(() => {
        this.actualizarListadoEstudiantes();
        // No es necesario hacer nada aquí ya que el pipe actualizará automáticamente la lista
      });
    }
    
  }
}
function subscribe(arg0: { next: (result: IStudent[]) => void; error: (err: any) => void; complete: () => void; }) {
  throw new Error('Function not implemented.');
}


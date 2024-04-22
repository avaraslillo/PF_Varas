import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { IStudent } from '../models/student.model';
import { ServicioEstudiantesService } from '../services/servicio-estudiantes.service';
import { StudentDialogComponent } from '../student-dialog/student-dialog.component';



@Component({
  selector: 'app-students-page',
  templateUrl: './students-page.component.html',
  styleUrl: './students-page.component.css'
})
export class StudentsPageComponent implements OnInit{
  displayedColumns: string[] = ['posicion', 'nombres', 'email','acciones'];


  

  /*@ViewChild(StudentDialogComponent)
  studentDialogComponent: StudentDialogComponent = new StudentDialogComponent;*/
  listadoEstudiantes: IStudent[] = [];
  dataSource!: MatTableDataSource<IStudent>;
  suscripcionObservable: Subscription | undefined;
  constructor(public studentDialog: MatDialog, private obtenerEstudiantes: ServicioEstudiantesService) {

    
  }

  ngOnInit(): void {
    const observable=this.obtenerEstudiantes.obtenerListadoEstudiantes().pipe(
      map((result: any) => result as IStudent[])
    ).subscribe({
      next:(result: IStudent[])=>{
        this.listadoEstudiantes=result;
        this.dataSource = new MatTableDataSource<IStudent>(this.listadoEstudiantes);
      },
      error:(err)=>{
        console.log(err)
      },
      complete:()=>{
        this.ngOnDestroy();
      }
    })
    //this.listadoEstudiantes=this.obtenerEstudiantes.obtenerListadoEstudiantes();
    //this.dataSource = new MatTableDataSource<IStudent>(this.listadoEstudiantes);
  }

  ngOnDestroy(): void {
    if (this.suscripcionObservable) {
      this.suscripcionObservable.unsubscribe();
    }
  }


  abrirFormulario(usuarioAEditar?: IStudent ) {
    const dialogRef = this.studentDialog
                          .open(StudentDialogComponent,{data:usuarioAEditar})
                          .afterClosed()
                          .subscribe({
                            next:(result)=>{
                              if(result){
                                if(usuarioAEditar){
                                  this.listadoEstudiantes=this.listadoEstudiantes.map((u: { posicion: number; })=>u.posicion===usuarioAEditar.posicion ? {...u,...result} : u);
                                }
                                else{
                                  result.posicion=(this.listadoEstudiantes[this.listadoEstudiantes.length-1].posicion)+1;
                                  this.listadoEstudiantes=[...this.listadoEstudiantes, result]; //this.listadoEstudiantes.push(result);
                                }
                                this.dataSource.data = this.listadoEstudiantes;
                              }
                            }
                          });
  }


  onDeleteUser(id_eliminar: number){
    if(confirm('¿Está seguro de eliminar al usuario seleccionado?')){
      this.listadoEstudiantes = this.listadoEstudiantes.filter((u: { posicion: number; })=>u.posicion!=id_eliminar);
      this.dataSource.data = this.listadoEstudiantes;
    }
    
  }
}
function subscribe(arg0: { next: (result: IStudent[]) => void; error: (err: any) => void; complete: () => void; }) {
  throw new Error('Function not implemented.');
}


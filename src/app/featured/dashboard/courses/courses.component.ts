import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServicioCursosService } from '../../../core/services/servicio-cursos.service';
import { CoursesDialogComponent } from '../courses-dialog/courses-dialog.component';
import { ICourse } from '../models/course.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit{
  displayedColumns: string[] = ['codigo_curso', 'nombre_curso','acciones'];


  

  /*@ViewChild(StudentDialogComponent)
  studentDialogComponent: StudentDialogComponent = new StudentDialogComponent;*/
  listadoCursos: ICourse[] = [];
  dataSource: MatTableDataSource<ICourse>=new MatTableDataSource<ICourse>(this.listadoCursos);
  //subscriptionObservable?: Observable<ICourse>;
  observableCursos:Observable<ICourse[]>=EMPTY;
  private subscriptionObservable: Subscription = new Subscription();
  constructor(public courseDialog: MatDialog, private servicioCursos: ServicioCursosService) {

    
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
    
    this.observableCursos=this.servicioCursos.obtenerlistadoCursos().pipe(
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
    })
  }


  abrirFormulario(cursoAEditar?: ICourse ) {
    const dialogRef = this.courseDialog
                          .open(CoursesDialogComponent,{data:cursoAEditar})
                          .afterClosed()
                          .subscribe({
                            next:(result)=>{
                              if(result){
                                
                                if(cursoAEditar){
                                  this.servicioCursos.modificarCurso(result).subscribe(() => {
                                    this.actualizarListadoCursos();
                                    // No es necesario hacer nada aquí ya que el pipe actualizará automáticamente la lista
                                  });
                                }
                                else{
                                  this.servicioCursos.agregarCurso(result).subscribe(() => {
                                    this.actualizarListadoCursos();
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


  onDeleteCourse(id_eliminar: number){
    if(confirm('¿Está seguro de eliminar al curso seleccionado?')){
      this.servicioCursos.eliminarCurso(id_eliminar).subscribe(() => {
        this.actualizarListadoCursos();
        // No es necesario hacer nada aquí ya que el pipe actualizará automáticamente la lista
      });
    }
    
  }
}

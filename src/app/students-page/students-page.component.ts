import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { IStudent } from '../models/student.model';
import { StudentDialogComponent } from '../student-dialog/student-dialog.component';



@Component({
  selector: 'app-students-page',
  templateUrl: './students-page.component.html',
  styleUrl: './students-page.component.css'
})
export class StudentsPageComponent {
  displayedColumns: string[] = ['posicion', 'nombres', 'email','acciones'];

  ELEMENT_DATA: IStudent[] = [
    {posicion: 1, nombres: 'Edward', apellidos: 'Elric', email: 'ed.elric@amestris.com'},
    {posicion: 2, nombres: 'Alphonse', apellidos: 'Elric', email: 'al.elric@amestris.com'},
    {posicion: 3, nombres: 'Winry', apellidos: 'Rockbell', email: 'win.rockbell@amestris.com'},
    {posicion: 4, nombres: 'Roy', apellidos: 'Mustang', email: 'roy.mustang@amestris.com'},
  ];
  dataSource = new MatTableDataSource<IStudent>(this.ELEMENT_DATA);

  /*@ViewChild(StudentDialogComponent)
  studentDialogComponent: StudentDialogComponent = new StudentDialogComponent;*/

  constructor(public studentDialog: MatDialog) {
    
  }


  abrirFormulario(usuarioAEditar?: IStudent ) {
    const dialogRef = this.studentDialog
                          .open(StudentDialogComponent,{data:usuarioAEditar})
                          .afterClosed()
                          .subscribe({
                            next:(result)=>{
                              if(result){
                                if(usuarioAEditar){
                                  this.ELEMENT_DATA=this.ELEMENT_DATA.map((u)=>u.posicion===usuarioAEditar.posicion ? {...u,...result} : u);
                                }
                                else{
                                  result.posicion=(this.ELEMENT_DATA[this.ELEMENT_DATA.length-1].posicion)+1;
                                  this.ELEMENT_DATA=[...this.ELEMENT_DATA, result]; //this.ELEMENT_DATA.push(result);
                                }
                                this.dataSource.data = this.ELEMENT_DATA;
                              }
                            }
                          });
  }


  onDeleteUser(id_eliminar: number){
    if(confirm('¿Está seguro de eliminar al usuario seleccionado?')){
      this.ELEMENT_DATA = this.ELEMENT_DATA.filter((u)=>u.posicion!=id_eliminar);
      this.dataSource.data = this.ELEMENT_DATA;
    }
    
  }
}

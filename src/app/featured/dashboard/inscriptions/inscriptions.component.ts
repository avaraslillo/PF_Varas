import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { EMPTY, Observable, Subscription, map } from 'rxjs';
import { ServicioCursosService } from '../../../core/services/servicio-cursos.service';
import { ServicioEstudiantesService } from '../../../core/services/servicio-estudiantes.service';
import { ServicioInscripcionesService } from '../../../core/services/servicio-inscripciones.service';
import { ICourse } from '../models/course.model';
import { IInscription, IInscriptionForm } from '../models/inscription.model';
import { IStudent } from '../models/student.model';

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


   inscriptionForm = new FormGroup<IInscriptionForm>({
    course: new FormControl<ICourse | null>(null, Validators.required),
    student: new FormControl<IStudent | null>(null, Validators.required),
  });

  observableInscripciones: Observable<IInscription[]> = EMPTY;
  private subscriptionObservable: Subscription = new Subscription();
  dataSource: MatTableDataSource<IInscription>=new MatTableDataSource<IInscription>(this.inscripciones);

  constructor(private servicioEstudiantes : ServicioEstudiantesService,
              private servicioCursos: ServicioCursosService, 
              private servicioInscripciones: ServicioInscripcionesService) {

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

  loadCourses(){
    this.servicioCursos.obtenerlistadoCursos().subscribe((result: any) => this.cursos = result);
  }

  loadStudents(){
    this.servicioEstudiantes.obtenerListadoEstudiantes().subscribe((result: any) => this.estudiantes = result);
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

  onDropdownOpened(select: MatSelect) {
    if (!select.panelOpen) {
      select.close();
    }
  }


}

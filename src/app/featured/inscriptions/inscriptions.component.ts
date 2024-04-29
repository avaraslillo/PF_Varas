import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { EMPTY, Observable, Subscription, map } from 'rxjs';
import { ServicioCursosService } from '../../core/services/servicio-cursos.service';
import { ServicioEstudiantesService } from '../../core/services/servicio-estudiantes.service';
import { ServicioInscripcionesService } from '../../core/services/servicio-inscripciones.service';
import { ICourse } from '../models/course.model';
import { IInscription, IInscriptionForm } from '../models/inscription.model';
import { IStudent } from '../models/student.model';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrl: './inscriptions.component.css'
})
export class InscriptionsComponent implements OnInit, OnDestroy{

  displayedColumns=['posicion','nombre_estudiante','nombre_curso','acciones'];

  estudiantes: IStudent[] = [];
  cursos: ICourse[] = [];
  inscripciones: IInscription[] = [];


   inscriptionForm = new FormGroup<IInscriptionForm>({
    curso: new FormControl(null),
    estudiante: new FormControl(null),
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

  ngOnDestroy(): void {
    if (this.subscriptionObservable) {
      this.subscriptionObservable.unsubscribe();
    }
  }
}

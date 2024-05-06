import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import Swal from 'sweetalert2';
import { ICourse } from '../../featured/dashboard/models/course.model';
import { ServicioInscripcionesService } from './servicio-inscripciones.service';

let listadoCursos: ICourse[] = [
  {codigo: 56200, nombre: 'Spring Framework Intermedio'},
  {codigo: 56201, nombre: 'Fundamentos de AWS'},
  {codigo: 56202, nombre: 'Data Science'},
  {codigo: 56203, nombre: 'Inteligencia Artificial'}
];

@Injectable({
  providedIn: 'root'
})
export class ServicioCursosService {


  obtenerlistadoCursos(): Observable<ICourse[]>{

    return of(listadoCursos).pipe(delay(500));
  }

  obtenerCursoPorCodigo(id: number): Observable<ICourse|undefined>{
    
    return of(listadoCursos.find((u) => u.codigo === id)).pipe(delay(500));
  }

  agregarCurso(curso: ICourse): Observable<ICourse[]>{
    if (listadoCursos.some(u => u.codigo == curso.codigo)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El código ya existe. No se puede agregar el curso.',
      });
    }
    else{
      listadoCursos=[...listadoCursos, curso];
    }
    
    return of(listadoCursos).pipe(delay(500));
  }

  modificarCurso(curso: ICourse): Observable<ICourse[]>{
    listadoCursos = listadoCursos.map((u) =>
      u.codigo === curso.codigo ? { ...u, ...curso } : u
    )
    //listadoEstudiantes=listadoEstudiantes.map((u: { id: number; })=>u.id===estudiante.id ? {...u,...listadoEstudiantes} : u);
    return of(listadoCursos).pipe(delay(500));
  }

  eliminarCurso(codigo_eliminar: number): Observable<ICourse[]>{
    if(this.validarEliminacion(codigo_eliminar)==false){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No es posible eliminar un curso con estudiantes inscritos. Por favor, elimine las inscripciones antes de eliminar el curso.',
      });
      return of(listadoCursos).pipe(delay(500));
    }
    else{
      return of(listadoCursos = listadoCursos.filter((u: { codigo: number; })=>u.codigo!=codigo_eliminar)).pipe(delay(500));
    }
    
  }

  validarEliminacion(codigo_eliminar: number): boolean {
    let servicioInscripciones = new ServicioInscripcionesService();

    let inscripcionesCurso=servicioInscripciones.obtenerInscripcionesPorCodigoCurso(codigo_eliminar);

    if(inscripcionesCurso.length>0){
      return false;
    }
    else{
      return true;
    }
  }
}


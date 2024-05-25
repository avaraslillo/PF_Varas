import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, map, of, switchMap } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment.development';
import { ICourse, ICourseCreatePayload } from '../../featured/dashboard/models/course.model';
import { ServicioInscripcionesService } from './servicio-inscripciones.service';

/*let listadoCursos: ICourse[] = [
  {id: 56200, nombre: 'Spring Framework Intermedio'},
  {id: 56201, nombre: 'Fundamentos de AWS'},
  {id: 56202, nombre: 'Data Science'},
  {id: 56203, nombre: 'Inteligencia Artificial'}
];*/

@Injectable({
  providedIn: 'root'
})
export class ServicioCursosService {
  private urlAPI=environment.baseAPIURL;

  constructor(private http: HttpClient) {
    
  }

  obtenerlistadoCursos(): Observable<ICourse[]>{

    return this.http.get<ICourse[]>(this.urlAPI+"/courses").pipe(delay(500));
  }

  obtenerCursoPorId(id: number): Observable<ICourse>{
    
    return this.http.get<ICourse[]>(this.urlAPI+"/courses/?id="+id).pipe(
      map(courses => courses[0]),
    );
  }

  agregarCurso(curso: ICourseCreatePayload): Observable<ICourse|undefined> {
    return this.obtenerCursoPorId(curso.id).pipe(
      switchMap((cursoExistente: ICourse|undefined) => {
        if (cursoExistente?.id == curso?.id) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El código ya existe. No se puede agregar el curso.',
          });
          return of(undefined);
        } else {
          return this.http.post<ICourse>(this.urlAPI + '/courses/', curso);
        }
      })
    );
  }

  modificarCurso(curso: ICourse): Observable<ICourse>{
    return this.http.put<ICourse>(this.urlAPI+"/courses/"+curso.id, curso);
  }

  eliminarCurso(id_eliminar: number): Observable<ICourse|undefined>{
    if(this.validarEliminacion(id_eliminar)==false){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No es posible eliminar un curso con estudiantes inscritos. Por favor, elimine las inscripciones antes de eliminar el curso.',
      });
      return of(undefined);
    }
    else{
      return this.http.delete<ICourse>(this.urlAPI+"/courses/"+id_eliminar);
    }
  }

  validarEliminacion(id_eliminar: number): boolean {
    
    let servicioInscripciones = new ServicioInscripcionesService(this.http);

    let inscripcionesCurso=servicioInscripciones.obtenerInscripcionesPorCodigoCurso(id_eliminar).subscribe((inscripciones)=>{
      if(inscripciones.length>0){
        return false;
      }
      else{
        return true;
      }
    });

    return true;

  }
}


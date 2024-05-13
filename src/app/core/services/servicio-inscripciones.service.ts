import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, map, of } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IInscription, IInscriptionCreateData } from '../../featured/dashboard/models/inscription.model';

let listadoInscripciones: IInscription[]  = [
  
]

@Injectable({
  providedIn: 'root'
})
export class ServicioInscripcionesService {
  private urlAPI=environment.baseAPIURL;

  constructor(private http: HttpClient) {
    
  }
  obtenerlistadoInscripciones(): Observable<IInscription[]>{

    return this.http.get<IInscription[]>(this.urlAPI+"/inscriptions").pipe(delay(500));
  }

  obtenerInscripcionPorID(id: string): Observable<IInscription|undefined>{
    
    return this.http.get<IInscription[]>(this.urlAPI+"/inscriptions/?id="+id).pipe(map((inscriptions => inscriptions[0])));
  }

  agregarInscripcion(inscripcion: IInscriptionCreateData): Observable<IInscription|undefined>{
    if(inscripcion.course && inscripcion.student){
      const newInscription: IInscription = {
        id: new Date().getTime().toString(),
        student: inscripcion.student,
        course: inscripcion.course
      
      }
      return this.http.post<IInscription>(this.urlAPI + '/inscriptions', newInscription).pipe(map((newInscription) => newInscription));
    }
    else{
      return of(undefined);
    }
  }

  modificarInscripcion(inscripcion: IInscription): Observable<IInscription|undefined>{
    return this.http.put<IInscription>(this.urlAPI+"/inscriptions/?id="+inscripcion.id, inscripcion);
  }

  eliminarInscripcion(id_eliminar: string): Observable<IInscription|undefined>{

    return this.http.delete<IInscription>(this.urlAPI+"/inscriptions/"+id_eliminar);
  }


  obtenerInscripcionesPorCodigoCurso(codigo_curso: number): Observable<IInscription[]> {
    return this.http.get<IInscription[]>(this.urlAPI + '/inscriptions/?course=' + codigo_curso).pipe(
      map((inscriptions: IInscription[]) => inscriptions.filter(inscription => inscription.course?.id === codigo_curso))
    );
  }
}

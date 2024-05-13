import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IStudent } from '../../featured/dashboard/models/student.model';


/*let listadoEstudiantes: IStudent[] = [
  {id: 1, nombres: 'Edward', apellidos: 'Elric', email: 'ed.elric@amestris.com'},
  {id: 2, nombres: 'Alphonse', apellidos: 'Elric', email: 'al.elric@amestris.com'},
  {id: 3, nombres: 'Winry', apellidos: 'Rockbell', email: 'win.rockbell@amestris.com'},
  {id: 4, nombres: 'Roy', apellidos: 'Mustang', email: 'roy.mustang@amestris.com'},
  {id: 5, nombres: 'Riza', apellidos: 'Hawkeye', email: 'riza.hawkeye@amestris.com'},
  {id: 6, nombres: 'Olivier Mira', apellidos: 'Armstrong', email: 'olivier.armstrong@amestris.com'},
];*/

let listadoEstudiantes: IStudent[] = [];
@Injectable({ providedIn: 'root' })
export class ServicioEstudiantesService {

  private urlAPI=environment.baseAPIURL;

  constructor(private http: HttpClient) {
    
  }
    obtenerListadoEstudiantes(): Observable<IStudent[]>{
      return this.http.get<IStudent[]>(this.urlAPI+"/students").pipe(delay(500));
    }

    obtenerEstudiantePorID(id: number): Observable<IStudent|undefined>{
      return this.http.get<IStudent>(this.urlAPI+"/students/"+id).pipe(delay(500));
    }

    agregarEstudiante(estudiante: IStudent): Observable<IStudent>{
      return this.http.post<IStudent>(this.urlAPI+"/students/",
      estudiante);
    }

    modificarEstudiante(estudiante: IStudent): Observable<IStudent>{
      return this.http.put<IStudent>(this.urlAPI+"/students/"+estudiante.id, estudiante);
    }

    eliminarEstudiante(id_eliminar: number): Observable<IStudent>{
      return this.http.delete<IStudent>(this.urlAPI+"/students/"+id_eliminar);
      //return this.http.get<IStudent[]>(this.urlAPI).pipe(delay(500));

      //return of(listadoEstudiantes = listadoEstudiantes.filter((u: { id: number; })=>u.id!=id_eliminar)).pipe(delay(500));
    }
}



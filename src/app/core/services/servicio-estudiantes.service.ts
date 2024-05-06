import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, of, tap } from 'rxjs';
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

  private urlAPI="https://6636ea4c288fedf6937effbc.mockapi.io/api/v1/students";

  constructor(private http: HttpClient) {
    
  }
    obtenerListadoEstudiantes(): Observable<IStudent[]>{
      return this.http.get<IStudent[]>(this.urlAPI).pipe(delay(500),tap(data => {
        // Guardar los contenidos en el arreglo global
        listadoEstudiantes = data;
      }));
      //return of(listadoEstudiantes).pipe(delay(500)); //return listadoEstudiantes;
    }

    obtenerEstudiantePorID(id: number): Observable<IStudent|undefined>{
      //return this.http.get<IStudent>(this.urlAPI+"/"+id).pipe(delay(500));
      
      return of(listadoEstudiantes.find((u) => u.id === id)).pipe(delay(500));
    }

    agregarEstudiante(estudiante: IStudent): Observable<IStudent[]>{
      //this.http.post<IStudent>(this.urlAPI, estudiante);
      //return this.http.get<IStudent[]>(this.urlAPI).pipe(delay(500));
      estudiante.id=(Number(listadoEstudiantes[listadoEstudiantes.length-1].id))+1;
      listadoEstudiantes=[...listadoEstudiantes, estudiante]; //this.listadoEstudiantes.push(result);
      return of(listadoEstudiantes).pipe(delay(500));
    }

    modificarEstudiante(estudiante: IStudent): Observable<IStudent[]>{
      //this.http.put<IStudent>(this.urlAPI+"/"+estudiante.id, estudiante);
      //return this.http.get<IStudent[]>(this.urlAPI).pipe(delay(500));
      listadoEstudiantes = listadoEstudiantes.map((u) =>
        u.id === estudiante.id ? { ...u, ...estudiante } : u
      )
      //listadoEstudiantes=listadoEstudiantes.map((u: { id: number; })=>u.id===estudiante.id ? {...u,...listadoEstudiantes} : u);
      return of(listadoEstudiantes).pipe(delay(500));
    }

    eliminarEstudiante(id_eliminar: number): Observable<IStudent[]>{
      //this.http.delete<IStudent>(this.urlAPI+"/"+id_eliminar);
      //return this.http.get<IStudent[]>(this.urlAPI).pipe(delay(500));

      return of(listadoEstudiantes = listadoEstudiantes.filter((u: { id: number; })=>u.id!=id_eliminar)).pipe(delay(500));
    }
}



import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { IStudent } from '../../featured/models/student.model';


let listadoEstudiantes: IStudent[] = [
  {posicion: 1, nombres: 'Edward', apellidos: 'Elric', email: 'ed.elric@amestris.com'},
  {posicion: 2, nombres: 'Alphonse', apellidos: 'Elric', email: 'al.elric@amestris.com'},
  {posicion: 3, nombres: 'Winry', apellidos: 'Rockbell', email: 'win.rockbell@amestris.com'},
  {posicion: 4, nombres: 'Roy', apellidos: 'Mustang', email: 'roy.mustang@amestris.com'},
  {posicion: 5, nombres: 'Riza', apellidos: 'Hawkeye', email: 'riza.hawkeye@amestris.com'},
  {posicion: 6, nombres: 'Olivier Mira', apellidos: 'Armstrong', email: 'olivier.armstrong@amestris.com'},
];
@Injectable({ providedIn: 'root' })
export class ServicioEstudiantesService {


    obtenerListadoEstudiantes(): Observable<IStudent[]>{

      return of(listadoEstudiantes).pipe(delay(500)); //return listadoEstudiantes;
    }

    obtenerEstudiantePorID(id: number): Observable<IStudent|undefined>{
      
      return of(listadoEstudiantes.find((u) => u.posicion === id)).pipe(delay(500));
    }

    agregarEstudiante(estudiante: IStudent): Observable<IStudent[]>{
      estudiante.posicion=(listadoEstudiantes[listadoEstudiantes.length-1].posicion)+1;
      listadoEstudiantes=[...listadoEstudiantes, estudiante]; //this.listadoEstudiantes.push(result);
      return of(listadoEstudiantes).pipe(delay(500));
    }

    modificarEstudiante(estudiante: IStudent): Observable<IStudent[]>{
      listadoEstudiantes = listadoEstudiantes.map((u) =>
        u.posicion === estudiante.posicion ? { ...u, ...estudiante } : u
      )
      //listadoEstudiantes=listadoEstudiantes.map((u: { posicion: number; })=>u.posicion===estudiante.posicion ? {...u,...listadoEstudiantes} : u);
      return of(listadoEstudiantes).pipe(delay(500));
    }

    eliminarEstudiante(id_eliminar: number): Observable<IStudent[]>{

      return of(listadoEstudiantes = listadoEstudiantes.filter((u: { posicion: number; })=>u.posicion!=id_eliminar)).pipe(delay(500));
    }
}



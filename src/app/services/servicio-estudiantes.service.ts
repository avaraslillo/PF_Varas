import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { IStudent } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})

@Injectable({ providedIn: 'root' })
export class ServicioEstudiantesService {

    obtenerListadoEstudiantes(): Observable<IStudent[]>{
      let listadoEstudiantes: IStudent[] = [
        {posicion: 1, nombres: 'Edward', apellidos: 'Elric', email: 'ed.elric@amestris.com'},
        {posicion: 2, nombres: 'Alphonse', apellidos: 'Elric', email: 'al.elric@amestris.com'},
        {posicion: 3, nombres: 'Winry', apellidos: 'Rockbell', email: 'win.rockbell@amestris.com'},
        {posicion: 4, nombres: 'Roy', apellidos: 'Mustang', email: 'roy.mustang@amestris.com'},
        {posicion: 5, nombres: 'Riza', apellidos: 'Hawkeye', email: 'riza.hawkeye@amestris.com'},
        {posicion: 6, nombres: 'Olivier Mira', apellidos: 'Armstrong', email: 'olivier.armstrong@amestris.com'},
      ];
      return of(listadoEstudiantes).pipe(delay(500));; //return listadoEstudiantes;
    }
}



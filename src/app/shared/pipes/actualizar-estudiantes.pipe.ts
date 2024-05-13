import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServicioEstudiantesService } from '../../core/services/servicio-estudiantes.service';

@Pipe({
  name: 'actualizarEstudiantes'
})
export class ActualizarEstudiantesPipe implements PipeTransform {
  constructor(private servicioEstudiantes: ServicioEstudiantesService) {}

  transform(): Observable<any[]> {
    return this.servicioEstudiantes.obtenerListadoEstudiantes().pipe(
      map(listadoEstudiantes => {
        return listadoEstudiantes;
      })
    );
  }
}
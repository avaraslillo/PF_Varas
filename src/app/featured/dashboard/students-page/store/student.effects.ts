import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { ServicioEstudiantesService } from '../../../../core/services/servicio-estudiantes.service';
import { StudentActions } from './student.actions';


@Injectable()
export class StudentEffects {

  loadStudents$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(StudentActions.loadStudents),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.servicioEstudiantes.obtenerListadoEstudiantes().pipe(
          map(data => StudentActions.loadStudentsSuccess({ data })),
          catchError(error => of(StudentActions.loadStudentsFailure({ error }))))
      )
    );
  });

  loadStudent$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(StudentActions.loadStudent),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.servicioEstudiantes.obtenerEstudiantePorID(action.id).pipe(
          map(data => StudentActions.loadStudentSuccess({ data })),
          catchError(error => of(StudentActions.loadStudentFailure({ error }))))
      )
    );
  });

  createStudent$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(StudentActions.createStudent),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.servicioEstudiantes.agregarEstudiante(action.payload).pipe(
          map(data => StudentActions.createStudentSuccess({ data })),
          catchError(error => of(StudentActions.createStudentFailure({ error }))))
      )
    );
  });

  updateStudent$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(StudentActions.updateStudent),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.servicioEstudiantes.modificarEstudiante(action.student).pipe(
          map(data => StudentActions.updateStudentSuccess({ data })),
          catchError(error => of(StudentActions.updateStudentFailure({ error }))))
      )
    );
  });

  deleteStudent$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(StudentActions.deleteStudent),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.servicioEstudiantes.eliminarEstudiante(action.id).pipe(
          map(data => StudentActions.deleteStudentSuccess({ data })),
          catchError(error => of(StudentActions.deleteStudentFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions,
    private servicioEstudiantes: ServicioEstudiantesService
  ) {}
}

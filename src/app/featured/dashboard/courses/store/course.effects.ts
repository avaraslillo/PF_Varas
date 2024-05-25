import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { ServicioCursosService } from '../../../../core/services/servicio-cursos.service';
import { CourseActions } from './course.actions';


@Injectable()
export class CoursesEffects {

  loadCourses$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CourseActions.loadCourses),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.servicioCursos.obtenerlistadoCursos().pipe(
          map(data => CourseActions.loadCoursesSuccess({ data })),
          catchError(error => of(CourseActions.loadCoursesFailure({ error }))))
      )
    );
  });

  loadCourse$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CourseActions.loadCourse),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.servicioCursos.obtenerCursoPorId(action.id).pipe(
          map(data => CourseActions.loadCourseSuccess({ data })),
          catchError(error => of(CourseActions.loadCourseFailure({ error }))))
      )
    );
  });

  createCourse$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CourseActions.createCourse),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.servicioCursos.agregarCurso(action.payload).pipe(
          map(data => CourseActions.createCourseSuccess({ data })),
          catchError(error => of(CourseActions.createCourseFailure({ error }))))
      )
    );
  });

  updateCourse$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CourseActions.updateCourse),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.servicioCursos.modificarCurso(action.course).pipe(
          map(data => CourseActions.updateCourseSuccess({ data })),
          catchError(error => of(CourseActions.updateCourseFailure({ error }))))
      )
    );
  });

  deleteCourse$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CourseActions.deleteCourse),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.servicioCursos.eliminarCurso(action.id).pipe(
          map(data => CourseActions.deleteCourseSuccess({ data })),
          catchError(error => of(CourseActions.deleteCourseFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions,
    private servicioCursos: ServicioCursosService
  ) {}
}

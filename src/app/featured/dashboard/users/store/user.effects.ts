import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { ServicioUsuariosService } from '../../../../core/services/servicio-usuarios.service';
import { UserActions } from './user.actions';


@Injectable()
export class UserEffects {

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(UserActions.loadUsers),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.servicioUsuarios.obtenerListadoUsuarios().pipe(
          map(data => UserActions.loadUsersSuccess({ data })),
          catchError(error => of(UserActions.loadUsersFailure({ error }))))
      )
    );
  });

  loadUserByID$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(UserActions.loadUserByID),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.servicioUsuarios.obtenerUsuarioPorID(action.id).pipe(
          map(data => UserActions.loadUserByIDSuccess({ data })),
          catchError(error => of(UserActions.loadUserByIDFailure({ error }))))
      )
    );
  });

  validateUser$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(UserActions.validateUser),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.servicioUsuarios.validarUsuario(action.userData).pipe(
          map(data => UserActions.loadUserByIDSuccess({ data })),
          catchError(error => of(UserActions.loadUserByIDFailure({ error }))))
      )
    );
  });

  createUser$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(UserActions.createUser),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.servicioUsuarios.agregarUsuario(action.payload).pipe(
          map(data => UserActions.createUserSuccess({ data })),
          catchError(error => of(UserActions.createUserFailure({ error }))))
      )
    );
  });

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(UserActions.updateUser),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.servicioUsuarios.modificarUsuario(action.user).pipe(
          map(data => UserActions.updateUserSuccess({ data })),
          catchError(error => of(UserActions.updateUserFailure({ error }))))
      )
    );
  });

  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(UserActions.deleteUser),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.servicioUsuarios.eliminarUsuario(action.id).pipe(
          map(data => UserActions.deleteUserSuccess({ data })),
          catchError(error => of(UserActions.deleteUserFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions,
              private servicioUsuarios: ServicioUsuariosService
  ) {}
}

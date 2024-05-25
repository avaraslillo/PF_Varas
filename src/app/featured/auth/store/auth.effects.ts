import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { ServicioAuthService } from '../../../core/services/servicio-auth.service';
import { AuthActions } from './auth.actions';


@Injectable()
export class AuthEffects {

  authAuths$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(AuthActions.login),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.authService.login(action.logindata).pipe(
          map(user => AuthActions.loginSuccess({ user })),
          catchError(error => of(AuthActions.loginFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions,
              private authService: ServicioAuthService
  ) {}
}

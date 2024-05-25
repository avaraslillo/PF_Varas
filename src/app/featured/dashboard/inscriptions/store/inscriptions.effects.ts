import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { InscriptionsActions } from './inscriptions.actions';


@Injectable()
export class InscriptionsEffects {

  inscriptionsInscriptionss$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscriptionsActions.inscriptionsInscriptionss),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => InscriptionsActions.inscriptionsInscriptionssSuccess({ data })),
          catchError(error => of(InscriptionsActions.inscriptionsInscriptionssFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions) {}
}

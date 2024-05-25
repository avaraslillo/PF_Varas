import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const InscriptionsActions = createActionGroup({
  source: 'Inscriptions',
  events: {
    'Inscriptions Inscriptionss': emptyProps(),
    'Inscriptions Inscriptionss Success': props<{ data: unknown }>(),
    'Inscriptions Inscriptionss Failure': props<{ error: unknown }>(),
  }
});

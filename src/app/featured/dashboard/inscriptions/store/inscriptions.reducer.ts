import { createFeature, createReducer, on } from '@ngrx/store';
import { InscriptionsActions } from './inscriptions.actions';

export const inscriptionsFeatureKey = 'inscriptions';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(InscriptionsActions.inscriptionsInscriptionss, state => state),
  on(InscriptionsActions.inscriptionsInscriptionssSuccess, (state, action) => state),
  on(InscriptionsActions.inscriptionsInscriptionssFailure, (state, action) => state),
);

export const inscriptionsFeature = createFeature({
  name: inscriptionsFeatureKey,
  reducer,
});


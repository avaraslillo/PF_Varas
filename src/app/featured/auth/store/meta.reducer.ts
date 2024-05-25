import { ActionReducer, MetaReducer } from '@ngrx/store';
import { AppState } from '../state/app.state';


export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    const nextState = reducer(state, action);
    localStorage.setItem('appState', JSON.stringify(nextState));
    return nextState;
  };
}

export function rehydrateState(): AppState {
  const storageState = localStorage.getItem('appState');
  return storageState ? JSON.parse(storageState) : undefined;
}

export const metaReducers: MetaReducer<AppState>[] = [localStorageSyncReducer];
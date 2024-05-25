import { AuthState, authReducer } from '../store/auth.reducer';

export interface AppState {
  auth: AuthState;
}

export const reducers = {
  auth: authReducer
};
import { createReducer, on } from '@ngrx/store';
import { IUser } from '../../dashboard/models/user.model';
import { AuthActions } from './auth.actions';

export const authsFeatureKey = 'auths';

export interface AuthState {
  // additional entities state properties
  user: IUser | null;
  error: any | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  /*logged: boolean,
  token: string | null,*/
}

export const initialState: AuthState = {
  user: null,
  error: null,
  isLoading: false,
  isAuthenticated: false
};


export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => {
    return {
      ...state,
      user: null,
      error: null,
      isLoading: true,
      isAuthenticated: false
    };
  }),
  on(AuthActions.loginSuccess, (state,action) => {
    return {
      ...state,
      user:action.user,
      error: null,
      isLoading: false,
      isAuthenticated: true
    };
  }),
  on(AuthActions.loginFailure, (state,action) => {
    return {
      ...state,
      user: null,
      error:action.error,
      isLoading: false,
      isAuthenticated: false
    };
  }),
  on(AuthActions.logout, (state) => {
    return {
      ...state,
      user: null,
      error: null,
      isLoading: false,
      isAuthenticated: false
    };
  })
);




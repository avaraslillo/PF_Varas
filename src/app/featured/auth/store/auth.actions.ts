import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LoginData } from './auth.model';

export const AuthActions = createActionGroup({
  source: 'Auth/API',
  events: {
    'Login': props<{ logindata: LoginData }>(),
    'LoginSuccess': props<{ user: any }>(),
    'LoginFailure': props<{ error: any  }>(),
    'Logout': emptyProps(),
  }
});

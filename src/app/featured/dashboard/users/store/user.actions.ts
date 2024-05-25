import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LoginData } from '../../../auth/store/auth.model';
import { IUser, IUserCreatePayload } from '../../models/user.model';

export const UserActions = createActionGroup({
  source: 'Users',

  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ data: IUser[] }>(),
    'Load Users Failure': props<{ error: unknown }>(),
    'Load User By ID': props<{ id: string }>(),
    'Load User By ID Success': props<{ data: IUser|undefined }>(),
    'Load User By ID Failure': props<{ error: unknown }>(),
    'Validate User': props<{ userData: IUser|LoginData }>(),
    'Validate User Success': props<{ data: IUser|undefined }>(),
    'Validate User Failure': props<{ error: unknown }>(),
    'Create User': props<{ payload: IUserCreatePayload }>(),
    'Create User Success': props<{ data: IUser }>(),
    'Create User Failure': props<{ error: unknown }>(),
    'Update User': props<{ user: IUser }>(),
    'Update User Success': props<{ data: IUser }>(),
    'Update User Failure': props<{ error: unknown }>(),
    'Delete User': props<{ id: string }>(),
    'Delete User Success': props<{ data: IUser }>(),
    'Delete User Failure': props<{ error: unknown }>(),
  }
});

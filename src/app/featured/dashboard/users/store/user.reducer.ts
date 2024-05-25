import { createReducer, on } from '@ngrx/store';
import { IUser } from '../../models/user.model';
import { UserActions } from './user.actions';

export const usersFeatureKey = 'users';

export interface UserState {
  users: IUser[];
  isLoading: boolean;
  error: unknown;
}

export const initialState: UserState = {
  users: [],
  isLoading: false,
  error: null

};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsers,
    (state) => {
      return {
        ...state,
        users: [],
        isLoading: true,
        error: null
    }
    }

  ),
  on(UserActions.loadUsersSuccess,
    (state, action) => {
      return {
        ...state,
        users: action.data,
        isLoading: false,
        error: null
      }
    }
  ),
  on(UserActions.loadUsersFailure,
    (state, action) => {
      return {
        ...state,
        users: [],
        isLoading: false,
        error: action.error
      }
    }
  ),
  on(UserActions.loadUserByID, (state) => {
    return {
      ...state,
      isLoading: true,
      error: null,
      users: []
    }
  }),
  on(UserActions.loadUserByIDSuccess,
    (state, action) => {
      if(action.data){
        return {
          ...state,
          users: [action.data],
          isLoading: false,
          error: null
        }
      }
      else{
        return state;
      }

    }
  ),
  on(UserActions.loadUserByIDFailure,
    (state, action) => {
      return {
        ...state,
        users: [],
        isLoading: false,
        error:action.error
      }
    }
  ),
  on(UserActions.validateUser, (state) => {
    return {
      ...state,
      isLoading: true,
      error: null,
      users: []
    }
  }),
  on(UserActions.validateUserSuccess,
    (state, action) => {
      if(action.data){
        return {
          ...state,
          users: [action.data],
          isLoading: false,
          error: null
        }
      }
      else{
        return state;
      }

    }
  ),
  on(UserActions.validateUserFailure,
    (state, action) => {
      return {
        ...state,
        users: [],
        isLoading: false,
        error:action.error
      }
    }
  ),
  on(UserActions.createUser,
    (state) => {
      return {
        ...state,
        isLoading: true,
        error: null
      }
    }
  ),
  on(UserActions.createUserSuccess,
    (state, action) => {
      return {
        ...state,
        users: [...state.users, action.data],
        isLoading: false,
        error: null
      }
    }
  ),
  on(UserActions.createUserFailure,
    (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    }
  ),
  on(UserActions.updateUser,  (state) => {
    return {
      ...state,
      isLoading: true,
      error: null
    }
  }),
  on(UserActions.updateUserSuccess, (state,action) => {
    return {  
      ...state,
      isLoading: false,
      users: state.users.map(user => {
        if(user.id === action.data.id){
          return action.data
        }
        else{
          return user
        }
      }),
      error: null
    } 
  }),   
  on(UserActions.updateUserFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error
    }
  }),
  on(UserActions.deleteUser, (state) => {
    return {
      ...state,
      isLoading: true,
      error: null
    }
  }),
  on(UserActions.deleteUserSuccess, (state,action) => {
    return {
      ...state,
      isLoading: false,
      users: state.users.filter(user => user.id !== action.data.id),
      error: null
  }
  }),
  on(UserActions.deleteUserFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error:action.error
    }
  })
);



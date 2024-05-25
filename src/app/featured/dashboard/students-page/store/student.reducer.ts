import { createReducer, on } from '@ngrx/store';
import { IStudent } from '../../models/student.model';
import { StudentActions } from './student.actions';

export const studentsFeatureKey = 'students';

export interface StudentState {
  students: IStudent[];
  isLoading: boolean;
  error: unknown;
}

export const initialState: StudentState = {
  students: [],
  isLoading: false,
  error: null,
};

export const studentReducer = createReducer(
  initialState,
  on(StudentActions.loadStudents,
    (state) => {
      return {
        ...state,
        students: [],
        isLoading: true,
        error: null
    }
    }

  ),
  on(StudentActions.loadStudentsSuccess,
    (state, action) => {
      return {
        ...state,
        students: action.data,
        isLoading: false,
        error: null
      }
    }
  ),
  on(StudentActions.loadStudentsFailure,
    (state, action) => {
      return {
        ...state,
        students: [],
        isLoading: false,
        error: action.error
      }
    }
  ),
  on(StudentActions.loadStudent, (state) => {
    return {
      ...state,
      isLoading: true,
      error: null,
      students: []
    }
  }),
  on(StudentActions.loadStudentSuccess,
    (state, action) => {
      if(action.data){
        return {
          ...state,
          students: [action.data],
          isLoading: false,
          error: null
        }
      }
      else{
        return state;
      }

    }
  ),
  on(StudentActions.loadStudentFailure,
    (state, action) => {
      return {
        ...state,
        students: [],
        isLoading: false,
        error:action.error
      }
    }
  ),
  on(StudentActions.createStudent,
    (state) => {
      return {
        ...state,
        isLoading: true,
        error: null
      }
    }
  ),
  on(StudentActions.createStudentSuccess,
    (state, action) => {
      return {
        ...state,
        students: [...state.students, action.data],
        isLoading: false,
        error: null
      }
    }
  ),
  on(StudentActions.createStudentFailure,
    (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    }
  ),
  on(StudentActions.updateStudent,  (state) => {
    return {
      ...state,
      isLoading: true,
      error: null
    }
  }),
  on(StudentActions.updateStudentSuccess, (state,action) => {
    return {  
      ...state,
      isLoading: false,
      students: state.students.map(student => {
        if(student.id === action.data.id){
          return action.data
        }
        else{
          return student
        }
      }),
      error: null
    } 
  }),   
  on(StudentActions.updateStudentFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error
    }
  }),
  on(StudentActions.deleteStudent, (state) => {
    return {
      ...state,
      isLoading: true,
      error: null
    }
  }),
  on(StudentActions.deleteStudentSuccess, (state,action) => {
    return {
      ...state,
      isLoading: false,
      students: state.students.filter(student => student.id !== action.data.id),
      error: null
  }
  }),
  on(StudentActions.deleteStudentFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error:action.error
    }
  })
);



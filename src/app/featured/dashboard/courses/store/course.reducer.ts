import { createReducer, on } from '@ngrx/store';
import { ICourse } from '../../models/course.model';
import { CourseActions } from './course.actions';

export const coursesFeatureKey = 'courses';

export interface CourseState {
  courses: ICourse[],
  isLoading: boolean,
  error:unknown
}

export const initialState: CourseState = {
  courses:[],
  isLoading: false,
  error: null

};

export const courseReducer = createReducer(
  initialState,
  on(CourseActions.loadCourses,
    (state) => {
      return {
        ...state,
        courses: [],
        isLoading: true,
        error: null
    }
    }

  ),
  on(CourseActions.loadCoursesSuccess,
    (state, action) => {
      return {
        ...state,
        courses: action.data,
        isLoading: false,
        error: null
      }
    }
  ),
  on(CourseActions.loadCoursesFailure,
    (state, action) => {
      return {
        ...state,
        courses: [],
        isLoading: false,
        error: action.error
      }
    }
  ),
  on(CourseActions.loadCourse, (state) => {
    return {
      ...state,
      isLoading: true,
      error: null,
      courses: []
    }
  }),
  on(CourseActions.loadCourseSuccess,
    (state, action) => {
      if(action.data){
        return {
          ...state,
          courses: [action.data],
          isLoading: false,
          error: null
        }
      }
      else{
        return state;
      }

    }
  ),
  on(CourseActions.loadCourseFailure,
    (state, action) => {
      return {
        ...state,
        courses: [],
        isLoading: false,
        error:action.error
      }
    }
  ),
  on(CourseActions.createCourse,
    (state) => {
      return {
        ...state,
        isLoading: true,
        error: null
      }
    }
  ),
  on(CourseActions.createCourseSuccess,
    (state, action) => {
      if(action.data){
        return {
          ...state,
          courses: [...state.courses, action.data],
          isLoading: false,
          error: null
        }
      }
      else{
        return {
          ...state,
          isLoading: false,
          error: null
        }
      }  

    }
  ),
  on(CourseActions.createCourseFailure,
    (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    }
  ),
  on(CourseActions.updateCourse,  (state) => {
    return {
      ...state,
      isLoading: true,
      error: null
    }
  }),
  on(CourseActions.updateCourseSuccess, (state,action) => {
    return {  
      ...state,
      isLoading: false,
      courses: state.courses.map(course => {
        if(course.id === action.data.id){
          return action.data
        }
        else{
          return course
        }
      }),
      error: null
    } 
  }),   
  on(CourseActions.updateCourseFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error
    }
  }),
  on(CourseActions.deleteCourse, (state) => {
    return {
      ...state,
      isLoading: true,
      error: null
    }
  }),
  on(CourseActions.deleteCourseSuccess, (state,action) => {
    return {
      ...state,
      isLoading: false,
      courses: state.courses.filter(course => course.id !== action.data?.id),
      error: null
  }
  }),
  on(CourseActions.deleteCourseFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error:action.error
    }
  })
);



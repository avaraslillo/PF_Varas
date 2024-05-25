import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseState } from './course.reducer';

export const selectCourseState = createFeatureSelector<CourseState>('courses');

export const selectIsLoading = createSelector(
  selectCourseState,
  (state: CourseState) => state.isLoading
);

export const selectCourses = createSelector(
  selectCourseState,
  (state: CourseState) => state.courses
);

export const selectCourseError = createSelector(
  selectCourseState,
  (state: CourseState) => state.error
);

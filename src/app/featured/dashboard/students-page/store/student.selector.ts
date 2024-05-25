import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StudentState } from './student.reducer';

export const selectStudentState = createFeatureSelector<StudentState>('students');

export const selectIsLoading = createSelector(
  selectStudentState,
  (state: StudentState) => state.isLoading
);

export const selectStudents = createSelector(
  selectStudentState,
  (state: StudentState) => state.students
);

export const selectStudentError = createSelector(
  selectStudentState,
  (state: StudentState) => state.error
);


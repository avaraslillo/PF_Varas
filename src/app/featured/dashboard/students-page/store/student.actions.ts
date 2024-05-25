import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IStudent, IStudentCreatePayload } from '../../models/student.model';

export const StudentActions = createActionGroup({
  source: 'Student/API',
  events: {
    'Load Students': emptyProps(),
    'Load Students Success': props<{ data: IStudent[] }>(),
    'Load Students Failure': props<{ error: unknown }>(),
    'Load Student': props<{ id: string }>(),
    'Load Student Success': props<{ data: IStudent|undefined }>(),
    'Load Student Failure': props<{ error: unknown }>(),
    'Create Student': props<{ payload: IStudentCreatePayload }>(),
    'Create Student Success': props<{ data: IStudent }>(),
    'Create Student Failure': props<{ error: unknown }>(),
    'Update Student': props<{ student: IStudent }>(),
    'Update Student Success': props<{ data: IStudent }>(),
    'Update Student Failure': props<{ error: unknown }>(),
    'Delete Student': props<{ id: number }>(),
    'Delete Student Success': props<{ data: IStudent }>(),
    'Delete Student Failure': props<{ error: unknown }>(),
  }
});

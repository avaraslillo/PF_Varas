import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ICourse, ICourseCreatePayload } from '../../models/course.model';

export const CourseActions = createActionGroup({
  source: 'Courses/API',
  events: {

    'Load Courses': emptyProps(),
    'Load Courses Success': props<{ data: ICourse[] }>(),
    'Load Courses Failure': props<{ error: unknown }>(),
    'Load Course': props<{ id: number }>(),
    'Load Course Success': props<{ data: ICourse|undefined }>(),
    'Load Course Failure': props<{ error: unknown }>(),
    'Create Course': props<{ payload: ICourseCreatePayload }>(),
    'Create Course Success': props<{ data: ICourse|undefined }>(),
    'Create Course Failure': props<{ error: unknown }>(),
    'Update Course': props<{ course: ICourse }>(),
    'Update Course Success': props<{ data: ICourse }>(),
    'Update Course Failure': props<{ error: unknown }>(),
    'Delete Course': props<{ id: number }>(),
    'Delete Course Success': props<{ data: ICourse | undefined }>(),
    'Delete Course Failure': props<{ error: unknown }>(),
  }
});

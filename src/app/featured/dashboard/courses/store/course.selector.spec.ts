import * as fromCourses from './course.reducer';
import { selectCourseState } from './course.selector';

describe('Courses Selectors', () => {
  it('should select the feature state', () => {
    const result = selectCourseState({
      [fromCourses.coursesFeatureKey]: {}
    });

    //expect(result).toEqual({});
  });
});

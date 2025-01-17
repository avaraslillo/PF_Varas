import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { CoursesEffects } from './course.effects';

describe('CoursesEffects', () => {
  let actions$: Observable<any>;
  let effects: CoursesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CoursesEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(CoursesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { InscriptionsEffects } from './inscriptions.effects';

describe('InscriptionsEffects', () => {
  let actions$: Observable<any>;
  let effects: InscriptionsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InscriptionsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(InscriptionsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});

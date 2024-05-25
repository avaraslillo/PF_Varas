import * as fromUsers from './user.reducer';
import { selectUserState } from './user.selectors';

describe('Users Selectors', () => {
  it('should select the feature state', () => {
    const result = selectUserState({
      [fromUsers.usersFeatureKey]: {}
    });

    //expect(result).toEqual({});
  });
});

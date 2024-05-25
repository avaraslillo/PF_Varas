import { initialState, userReducer } from './user.reducer';

describe('Users Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = userReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});

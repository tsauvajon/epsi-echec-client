import deepFreeze from 'deep-freeze';
import square from '../reducers/square';

describe('square reducer', () => {
  it('handles unknown actions', () => {
    const stateBefore = { id: 0 };

    const action = {
      type: 'UNKOWN_ACTION',
    };

    const stateAfter = { id: 0 };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
      square(stateBefore, action),
    ).toEqual(stateAfter);
  });

  it('should handle empy state', () => {
    expect(square(undefined, { type: '' })).toBeTruthy();
  });
});

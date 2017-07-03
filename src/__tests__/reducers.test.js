import deepFreeze from 'deep-freeze';
import checksApp from '../reducers/index';

it('handles unknown actions', () => {
  const stateBefore = { squares: [
    { id: 0 },
    {
      id: 1,
      player: 'white',
    },
  ] };

  const action = {
    type: 'UNKOWN_ACTION',
  };

  const stateAfter = { squares: [
    { id: 0 },
    {
      id: 1,
      player: 'white',
    },
  ] };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    checksApp(stateBefore, action).squares,
  ).toEqual(stateAfter.squares);
});

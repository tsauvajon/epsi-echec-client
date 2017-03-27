import deepFreeze from 'deep-freeze';
import squares from '../reducers/squares';
import { PieceEnum } from '../utility/util';

it('adds a piece', () => {
  const stateBefore = { squares: [
    { id: 0 },
    { id: 1 },
  ] };

  const action = {
    type: 'ADD_PIECE',
    player: 'white',
    piece: PieceEnum.QUEEN,
    id: 1,
  };

  const stateAfter = { squares: [
    { id: 0 },
    {
      id: 1,
      player: 'white',
      piece: PieceEnum.QUEEN,
    },
  ] };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    squares(stateBefore.squares, action),
  ).toEqual(stateAfter.squares);
});

it('removes a piece', () => {
  const stateBefore = { squares: [
    { id: 0 },
    {
      id: 1,
      player: 'white',
      piece: PieceEnum.QUEEN,
    },
  ] };

  const action = {
    type: 'REMOVE_PIECE',
    id: 1,
  };

  const stateAfter = { squares: [
    { id: 0 },
    { id: 1 },
  ] };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    squares(stateBefore.squares, action),
  ).toEqual(stateAfter.squares);
});

it('moves a piece', () => {
  const stateBefore = { squares: [
    { id: 0 },
    {
      id: 1,
      player: 'white',
      piece: PieceEnum.QUEEN,
    },
  ] };

  const action = {
    type: 'MOVE_PIECE',
    from: 1,
    to: 0,
  };

  const stateAfter = { squares: [
    {
      id: 0,
      player: 'white',
      piece: PieceEnum.QUEEN,
    },
    { id: 1 },
  ] };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    squares(stateBefore.squares, action),
  ).toEqual(stateAfter.squares);
});

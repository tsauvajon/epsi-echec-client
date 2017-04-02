import deepFreeze from 'deep-freeze';
import squares from '../reducers/squares';
import { PieceEnum } from '../utility/util';
import { movePiece, addPiece, removePiece } from '../actions';

it('adds a piece', () => {
  const stateBefore = { squares: [
    { id: 0 },
    { id: 1 },
  ] };

  const stateAfter = { squares: [
    { id: 0 },
    {
      id: 1,
      player: 'white',
      piece: PieceEnum.QUEEN,
    },
  ] };

  deepFreeze(stateBefore);

  expect(
    squares(stateBefore.squares, addPiece(1, 'white', PieceEnum.QUEEN)),
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

  const stateAfter = { squares: [
    { id: 0 },
    { id: 1 },
  ] };

  deepFreeze(stateBefore);

  expect(
    squares(stateBefore.squares, removePiece(1)),
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

  const stateAfter = { squares: [
    {
      id: 0,
      player: 'white',
      piece: PieceEnum.QUEEN,
    },
    { id: 1 },
  ] };

  deepFreeze(stateBefore);

  expect(
    squares(stateBefore.squares, movePiece(1, 0)),
  ).toEqual(stateAfter.squares);
});


it('moves a piece back and forth', () => {
  const stateBefore = { squares: [
    { id: 0 },
    {
      id: 1,
      player: 'white',
      piece: PieceEnum.QUEEN,
    },
  ] };

  deepFreeze(stateBefore);

  // store.dispatch(movePiece(1, 0));
  // store.dispatch(movePiece(0, 1));

  const squaresAfter = squares(
    squares(
      squares(
        squares(
          stateBefore.squares,
          movePiece(1, 0)),
        movePiece(0, 1)),
      movePiece(1, 0)),
    movePiece(0, 1),
  );

  expect(
    stateBefore.squares,
  ).toEqual(squaresAfter);
});

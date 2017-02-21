import { pieceMoves, move } from './move-tests';
import { getDefaultPieces } from './util';

const defaultBoard = getDefaultPieces();

it('tests pawn moves', () => {
  // pawn
  const pawn = 53;
  const moves = pieceMoves(pawn, defaultBoard);
  expect(moves).not.toEqual(null);
  expect(moves).not.toEqual(undefined);
});

it('tests rook moves', () => {
  const from = 0;
  const to = 36;
  const testBoard = move(defaultBoard.slice(), from, to);
  const moves = pieceMoves(to, testBoard);
  console.log(defaultBoard[to], moves);
  expect(moves).not.toEqual(null);
  expect(moves).not.toEqual(undefined);
});

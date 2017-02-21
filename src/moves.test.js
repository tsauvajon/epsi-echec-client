import { pieceMoves, move } from './moves';
import { getDefaultPieces } from './util';

const defaultBoard = getDefaultPieces();

it('moves pawns', () => {
  const pawn = 53;
  const moves = pieceMoves(pawn, defaultBoard);
  console.log(moves);
  expect(moves).toMatchSnapshot();
});

it('makes pawns eat', () => {
  const from = 53;
  const to = 21;
  const testBoard = move(defaultBoard, from, to);
  const movesEat = pieceMoves(to, testBoard);
  console.log(movesEat);
  expect(movesEat).toMatchSnapshot();
});


it('moves rook', () => {
  const from = 0;
  const to = 36;
  const testBoard = move(defaultBoard, from, to);
  const moves = pieceMoves(to, testBoard);
  expect(moves).toMatchSnapshot();
});

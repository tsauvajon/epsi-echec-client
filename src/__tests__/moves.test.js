import { pieceMoves, move } from '../moves';
import { getDefaultPieces } from '../util';

const defaultBoard = getDefaultPieces();

function testMove(from, to) {
  const testBoard = move(defaultBoard, from, to);
  return pieceMoves(to, testBoard);
}

it('moves pawns', () => {
  const moves = pieceMoves(53, defaultBoard);
  expect(moves).toMatchSnapshot();
});

it('makes pawns eat', () => {
  const moves = testMove(53, 21);
  expect(moves).toMatchSnapshot();
});

it('moves rooks', () => {
  const moves = testMove(0, 36);
  expect(moves).toMatchSnapshot();
});

it('moves knights', () => {
  const moves = testMove(6, 41);
  expect(moves).toMatchSnapshot();
});

it('moves bishops', () => {
  const moves = testMove(58, 36);
  expect(moves).toMatchSnapshot();
});

it('moves queens', () => {
  const moves = testMove(59, 36);
  expect(moves).toMatchSnapshot();
});

it('moves kings', () => {
  const moves = testMove(4, 62);
  expect(moves).toMatchSnapshot();
});
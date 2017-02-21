import { pieceMoves, move } from '../moves';
import { getDefaultPieces } from '../util';

const defaultBoard = getDefaultPieces();

it('moves pawns', () => {
  const pawn = 53;
  const moves = pieceMoves(pawn, defaultBoard);
  expect(moves).toMatchSnapshot();
});

it('makes pawns eat', () => {
  const moves = testMove(53, 21);
  return expect(moves).toMatchSnapshot();
});

it('moves rooks', () => {
  const moves = testMove(0, 36);
  return expect(moves).toMatchSnapshot();
});

it('moves knights', () => {
  const moves = testMove(6, 41);
  return expect(moves).toMatchSnapshot();
})

it('moves bishops', () => {
  const moves = testMove(58, 36);
  return expect(moves).toMatchSnapshot();
})

it('moves queens', () => {
  const moves = testMove(59, 36);
  return expect(moves).toMatchSnapshot();
})

it('moves kings', () => {
  const moves = testMove(4, 62);
  return expect(moves).toMatchSnapshot();
})

function testMove(from, to){
  const testBoard = move(defaultBoard, from, to);
  return pieceMoves(to, testBoard);
}

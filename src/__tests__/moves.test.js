import { pieceMoves } from '../moves/index';
import store from '../utility/store';
import { movePiece } from '../actions';

it('moves pawns', () => {
  const moves = pieceMoves(51, store.getState().squares);
  const expectedMoves = { moves: [35, 43], eats: [] };
  expect(moves).toEqual(expectedMoves);
});

it('makes pawns eat', () => {
  store.dispatch(movePiece(53, 21));

  const eats = pieceMoves(21, store.getState().squares);
  const expectedEats = { moves: [], eats: [12, 14] };
  expect(eats).toEqual(expectedEats);

  // TODO: implémenter UNDO à la place
  store.dispatch(movePiece(21, 53));
});

it('moves rooks', () => {
  store.dispatch(movePiece(0, 36));

  const moves = pieceMoves(36, store.getState().squares);
  const expectedMoves = {
    moves: [20, 28, 32, 33, 34, 35, 37, 38, 39, 44],
    eats: [52],
  };
  expect(moves).toEqual(expectedMoves);

  store.dispatch(movePiece(36, 0));
});

it('moves knights', () => {
  store.dispatch(movePiece(6, 41));

  const moves = pieceMoves(41, store.getState().squares);
  const expectedMoves = {
    moves: [24, 26, 35],
    eats: [51, 56, 58],
  };
  expect(moves).toEqual(expectedMoves);

  store.dispatch(movePiece(41, 6));
});

it('moves bishops', () => {
  store.dispatch(movePiece(58, 36));

  const moves = pieceMoves(36, store.getState().squares);
  const expectedMoves = {
    moves: [18, 22, 27, 29, 43, 45],
    eats: [9, 15],
  };
  expect(moves).toEqual(expectedMoves);

  store.dispatch(movePiece(36, 58));
});

it('moves queens', () => {
  store.dispatch(movePiece(59, 36));

  const moves = pieceMoves(36, store.getState().squares);
  const expectedMoves = {
    moves: [18, 20, 22, 27, 28, 29, 32, 33, 34, 35, 37, 38, 39, 43, 44, 45],
    // pour une raison inconnue sort marche mal
    eats: [9, 12, 15].sort(),
  };
  expect(moves).toEqual(expectedMoves);

  store.dispatch(movePiece(36, 59));
});

it('moves kings', () => {
  store.dispatch(movePiece(60, 27));

  const moves = pieceMoves(27, store.getState().squares);
  const expectedMoves = {
    moves: [18, 19, 20, 26, 28, 34, 35, 36],
    eats: [],
  };
  expect(moves).toEqual(expectedMoves);

  store.dispatch(movePiece(27, 60));
});

it('moves kings when close to borders', () => {
  store.dispatch(movePiece(4, 16));

  const moves = pieceMoves(16, store.getState().squares);
  const expectedMoves = {
    moves: [17, 24, 25],
    eats: [],
  };
  expect(moves).toEqual(expectedMoves);

  store.dispatch(movePiece(16, 4));
});

it('makes kings eat', () => {
  store.dispatch(movePiece(4, 62));

  const eats = pieceMoves(62, store.getState().squares);
  const expectedEats = {
    moves: [],
    eats: [53, 54, 55, 61, 63],
  };
  expect(eats).toEqual(expectedEats);

  store.dispatch(movePiece(62, 4));
});

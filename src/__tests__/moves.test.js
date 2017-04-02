import { pieceMoves } from '../moves/index';
import store from '../utility/store';
import { movePiece, removePiece, addPiece } from '../actions';

it('moves white pawns', () => {
  const moves = pieceMoves(51, store.getState().squares);
  const expectedMoves = { moves: [35, 43], eats: [] };
  expect(moves).toEqual(expectedMoves);
});

it('moves black pawns', () => {
  const moves = pieceMoves(11, store.getState().squares);
  const expectedMoves = { moves: [19, 27], eats: [] };
  expect(moves).toEqual(expectedMoves);
});

it('makes white pawns eat', () => {
  store.dispatch(movePiece(53, 21));

  const eats = pieceMoves(21, store.getState().squares);
  const expectedEats = { moves: [], eats: [12, 14] };
  expect(eats).toEqual(expectedEats);

  // TODO: implémenter UNDO à la place
  store.dispatch(movePiece(21, 53));
});

it('makes black pawns eat', () => {
  store.dispatch(movePiece(13, 45));

  const eats = pieceMoves(45, store.getState().squares);
  const expectedEats = { moves: [], eats: [52, 54] };
  expect(eats).toEqual(expectedEats);

  store.dispatch(movePiece(45, 13));
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

it('makes rooks eat upwards + left + right', () => {
  store.dispatch(movePiece(14, 40));
  store.dispatch(movePiece(56, 14));

  const moves = pieceMoves(14, store.getState().squares);
  const expectedMoves = {
    moves: [22, 30, 38, 46],
    eats: [6, 13, 15],
  };
  expect(moves).toEqual(expectedMoves);

  store.dispatch(movePiece(14, 56));
  store.dispatch(movePiece(40, 14));
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

it('moves knights to all possible positions', () => {
  store.dispatch(movePiece(62, 19));

  const moves = pieceMoves(19, store.getState().squares);
  const expectedMoves = {
    moves: [25, 29, 34, 36],
    eats: [2, 4, 9, 13],
  };
  expect(moves).toEqual(expectedMoves);

  store.dispatch(movePiece(19, 62));
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

it('makes bishops eat down-left and down-right', () => {
  store.dispatch(movePiece(2, 36));

  const moves = pieceMoves(36, store.getState().squares);
  const expectedMoves = {
    moves: [18, 22, 27, 29, 43, 45],
    eats: [50, 54],
  };
  expect(moves).toEqual(expectedMoves);

  store.dispatch(movePiece(36, 2));
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
    castles: [],
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
    castles: [],
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
    castles: [],
  };
  expect(eats).toEqual(expectedEats);

  store.dispatch(movePiece(62, 4));
  store.dispatch(addPiece(62, 'white', 'knight'));
});

it('makes white king eat', () => {
  store.dispatch(movePiece(60, 2));

  const eats = pieceMoves(2, store.getState().squares, []);
  const expectedEats = {
    moves: [],
    eats: [1, 3, 9, 10, 11],
    castles: [],
  };
  expect(eats).toEqual(expectedEats);
  store.dispatch(movePiece(2, 60));
  store.dispatch(addPiece(2, 'black', 'knight'));
});

it('forbids to castle when pieces are in between', () => {
  store.dispatch(removePiece(57));
  store.dispatch(removePiece(62));
  const moves = pieceMoves(60, store.getState().squares, [0, 7, 56, 63]);
  const expectedMoves = {
    moves: [],
    eats: [],
    castles: [],
  };
  expect(moves).toEqual(expectedMoves);
});


it('castles for white', () => {
  store.dispatch(removePiece(57));
  store.dispatch(removePiece(58));
  store.dispatch(removePiece(59));
  store.dispatch(removePiece(61));
  store.dispatch(removePiece(62));
  const moves = pieceMoves(60, store.getState().squares, [0, 7, 56, 63]);
  const expectedMoves = {
    moves: [59, 61],
    eats: [],
    castles: [57, 62],
  };
  expect(moves).toEqual(expectedMoves);
});

it('castles for black', () => {
  store.dispatch(removePiece(1));
  store.dispatch(removePiece(2));
  store.dispatch(removePiece(3));
  store.dispatch(removePiece(5));
  store.dispatch(removePiece(6));
  const moves = pieceMoves(4, store.getState().squares, [0, 7, 56, 63]);
  const expectedMoves = {
    moves: [3, 5],
    eats: [],
    castles: [1, 6],
  };
  expect(moves).toEqual(expectedMoves);
});

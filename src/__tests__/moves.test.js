import { pieceMoves } from '../moves/index';
import store from '../utility/store';
import { movePiece, removePiece } from '../actions';
import reducer from '../reducers/squares';

describe('moves', () => {
  const { squares } = store.getState();

  it('moves white pawns', () => {
    const moves = pieceMoves(51, squares);
    const expectedMoves = { moves: [35, 43], eats: [] };
    expect(moves).toEqual(expectedMoves);
  });

  it('moves black pawns', () => {
    const moves = pieceMoves(11, squares);
    const expectedMoves = { moves: [19, 27], eats: [] };
    expect(moves).toEqual(expectedMoves);
  });

  it('makes white pawns eat', () => {
    const after = reducer(squares, movePiece(53, 21));
    const eats = pieceMoves(21, after);

    const expectedEats = { moves: [], eats: [12, 14] };
    expect(eats).toEqual(expectedEats);
  });

  it('makes black pawns eat', () => {
    const after = reducer(squares, movePiece(13, 45));

    const eats = pieceMoves(45, after);
    const expectedEats = { moves: [], eats: [52, 54] };
    expect(eats).toEqual(expectedEats);
  });

  it('moves rooks', () => {
    const after = reducer(squares, movePiece(0, 36));

    const moves = pieceMoves(36, after);
    const expectedMoves = {
      moves: [20, 28, 32, 33, 34, 35, 37, 38, 39, 44],
      eats: [52],
    };
    expect(moves).toEqual(expectedMoves);
  });

  it('makes rooks eat upwards + left + right', () => {
    const intermediate = reducer(squares, movePiece(14, 40));
    const after = reducer(intermediate, movePiece(56, 14));

    const moves = pieceMoves(14, after);
    const expectedMoves = {
      moves: [22, 30, 38, 46],
      eats: [6, 13, 15],
    };
    expect(moves).toEqual(expectedMoves);
  });

  it('moves knights', () => {
    const after = reducer(squares, movePiece(6, 41));

    const moves = pieceMoves(41, after);
    const expectedMoves = {
      moves: [24, 26, 35],
      eats: [51, 56, 58],
    };
    expect(moves).toEqual(expectedMoves);
  });

  it('moves knights to all possible positions', () => {
    const after = reducer(squares, movePiece(62, 19));

    const moves = pieceMoves(19, after);
    const expectedMoves = {
      moves: [25, 29, 34, 36],
      eats: [2, 4, 9, 13],
    };
    expect(moves).toEqual(expectedMoves);
  });

  it('moves bishops', () => {
    const after = reducer(squares, movePiece(58, 36));

    const moves = pieceMoves(36, after);
    const expectedMoves = {
      moves: [18, 22, 27, 29, 43, 45],
      eats: [9, 15],
    };
    expect(moves).toEqual(expectedMoves);
  });

  it('makes bishops eat down-left and down-right', () => {
    const after = reducer(squares, movePiece(2, 36));

    const moves = pieceMoves(36, after);
    const expectedMoves = {
      moves: [18, 22, 27, 29, 43, 45],
      eats: [50, 54],
    };
    expect(moves).toEqual(expectedMoves);
  });

  it('moves queens', () => {
    const after = reducer(squares, movePiece(59, 36));

    const moves = pieceMoves(36, after);
    const expectedMoves = {
      moves: [18, 20, 22, 27, 28, 29, 32, 33, 34, 35, 37, 38, 39, 43, 44, 45],
      // pour une raison inconnue sort marche mal
      eats: [9, 12, 15].sort(),
    };
    expect(moves).toEqual(expectedMoves);
  });

  it('moves kings', () => {
    const after = reducer(squares, movePiece(60, 27));

    const moves = pieceMoves(27, after);
    const expectedMoves = {
      moves: [18, 19, 20, 26, 28, 34, 35, 36],
      eats: [],
      castles: [],
    };
    expect(moves).toEqual(expectedMoves);
  });

  it('moves kings when close to borders', () => {
    const after = reducer(squares, movePiece(4, 16));

    const moves = pieceMoves(16, after);
    const expectedMoves = {
      moves: [17, 24, 25],
      eats: [],
      castles: [],
    };
    expect(moves).toEqual(expectedMoves);
  });

  it('makes kings eat', () => {
    const after = reducer(squares, movePiece(4, 62));

    const eats = pieceMoves(62, after);
    const expectedEats = {
      moves: [],
      eats: [53, 54, 55, 61, 63],
      castles: [],
    };
    expect(eats).toEqual(expectedEats);
  });

  it('makes white king eat', () => {
    const after = reducer(squares, movePiece(60, 2));

    const eats = pieceMoves(2, after, []);
    const expectedEats = {
      moves: [],
      eats: [1, 3, 9, 10, 11],
      castles: [],
    };
    expect(eats).toEqual(expectedEats);
  });

  it('forbids to castle when pieces are in between', () => {
    const intermediate = reducer(squares, removePiece(57));
    const after = reducer(intermediate, removePiece(62));

    const moves = pieceMoves(60, after, [0, 7, 56, 63]);
    const expectedMoves = {
      moves: [],
      eats: [],
      castles: [],
    };
    expect(moves).toEqual(expectedMoves);
  });

  it('castles for white', () => {
    const after = reducer(
      reducer(
      reducer(
      reducer(
      reducer(
        squares,
        removePiece(62)),
        removePiece(61)),
        removePiece(59)),
        removePiece(58)),
        removePiece(57));

    const moves = pieceMoves(60, after, [0, 7, 56, 63]);
    const expectedMoves = {
      moves: [59, 61],
      eats: [],
      castles: [57, 62],
    };
    expect(moves).toEqual(expectedMoves);
  });

  it('castles for black', () => {
    const after = reducer(
      reducer(
      reducer(
      reducer(
      reducer(
        squares,
        removePiece(1)),
        removePiece(2)),
        removePiece(3)),
        removePiece(5)),
        removePiece(6));

    const moves = pieceMoves(4, after, [0, 7, 56, 63]);
    const expectedMoves = {
      moves: [3, 5],
      eats: [],
      castles: [1, 6],
    };
    expect(moves).toEqual(expectedMoves);
  });
});

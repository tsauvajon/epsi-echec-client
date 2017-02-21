import { PieceEnum, getX, getY, getId } from './util';
import Position from './Position';

function move(squares, from, to) {
  const buffer = squares.slice();
  buffer[to] = squares[from];
  buffer[from] = null;
  return buffer;
}

function pieceMoves(square, squares){
  if (squares[square]){
    switch (squares[square].piece) {
      case PieceEnum.PAWN:
        return pawnMoves(square, squares);

      case PieceEnum.ROOK:
        return rookMoves(square, squares);

      case PieceEnum.KNIGHT:
        return knightMoves(square, squares);

      case PieceEnum.BISHOP:
        return bishopMoves(square, squares);

      case PieceEnum.KING:
        return kingMoves(square, squares);

      case PieceEnum.QUEEN:
        return queenMoves(square, squares);

      default:
        return null;
    }
  }
}

//////////////// PAWN ////////////////

// TODO : check check (sans mauvais jeu de mot)
function pawnMoves(square, squares) {
    return { moves: pawnDeplacements(square, squares), eats: pawnEats(square, squares) }
}

function pawnDeplacements(square, squares) {
  const player = squares[square].player;
  const moves = [];
  const x = getX(square);
  const y = getY(square);

  if (player === "white") {

    let testOne = getId(x, y - 1);
    if(testOne >= 0 && !squares[testOne]) {
      moves.push(testOne);
      if(y === 6) {
        let testTwo = getId(x, 4);
        if (!squares[testTwo]) {
          moves.push(testTwo);
        }
      }
    }
  }
  else {
    let testOne = getId(x, y + 1);
    if(testOne < 64 && !squares[testOne]) {
      moves.push(testOne);
      if(y === 1) {
        let testTwo = getId(x, 3);
        if (!squares[testTwo]) {
          moves.push(testTwo);
        }
      }
    }
  }

  return moves;
}

function pawnEats(square, squares) {
  const player = squares[square].player;
  const eats = [];
  const pos = new Position(square);

  if (player === "white") {
    // TODO
  }
  else {
    // TODO
  }

  return [];
}

//////////////// ROOK ////////////////

function rookMoves(square, squares) {
  const moves = [];
  const eats = [];
  const player = squares[square].player;
  const pos = new Position(square);

  let test = 0;

  while (pos.addX(1) && test < 12){
    test++;
  }
  //
  // // vers le bas
  // while (pos.addX(1) && !square[pos.i]) {
  //   moves.push(pos.i);
  // }
  // pos.addX(1);
  // if (square[pos.i] && square[pos.i].player !== player) {
  //   eats.push(pos.i);
  // }
  //
  //
  // // vers le haut
  // pos.setI(square);
  // while (pos.addX(-1) && !square[pos.i]) {
  //   moves.push(pos.i);
  // }
  // pos.addX(-1);
  // if (square[pos.i] && square[pos.i].player !== player) {
  //   eats.push(pos.i);
  // }
  //
  // // droite
  // pos.setI(square);
  // while (pos.addY(1) && !square[pos.i]) {
  //   moves.push(pos.i);
  // }
  // pos.addY(1);
  // if (square[pos.i] && square[pos.i].player !== player) {
  //   eats.push(pos.i);
  // }
  //
  // // gauche
  // pos.setI(square);
  // while (pos.addY(-1) && !square[pos.i]) {
  //   moves.push  (pos.i);
  // }
  // pos.addY(-1);
  // if (square[pos.i] && square[pos.i].player !== player) {
  //   eats.push(pos.i);
  // }

  return { moves: moves, eats: eats };

}

//////////////// KNIGHT ////////////////

function knightMoves() {}


//////////////// BISHOP ////////////////

function bishopMoves() {}

// eats

//////////////// KING ////////////////

function kingMoves() {}

// eats

//////////////// QUEEN ////////////////

function queenMoves() {}

// eats



export { pieceMoves, move };

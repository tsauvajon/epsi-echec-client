import { PieceEnum, getX, getY, getId } from './util';
import Position from './Position';

function move(squares, from, to) {
  const buffer = squares.slice();
  buffer[to] = buffer[from];
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

function pawnMoves(square, squares) {
  const player = squares[square].player;
  return { moves: pawnDeplacements(square, squares, player), eats: pawnEats(square, squares, player) }
}

function pawnDeplacements(square, squares, player) {
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

function pawnEats(square, squares, player) {
  const eats = [];
  const pos = new Position(square);

  if (player === "white") {
    // haut gauche
    if (pos.addY(-1) && pos.addX(-1) && squares[pos.i] && squares[pos.i].player != player)
      eats.push(pos.i);

    pos.setI(square);

    // haut droite
    if (pos.addY(-1) && pos.addX(1) && squares[pos.i] && squares[pos.i].player != player)
      eats.push(pos.i);
  }
  else {
    // bas gauche
    if (pos.addY(1) && pos.addX(-1) && squares[pos.i] && squares[pos.i].player != player)
      eats.push(pos.i);

    pos.setI(square);

    // bas droite
    if (pos.addY(1) && pos.addX(1) && squares[pos.i] && squares[pos.i].player != player)
      eats.push(pos.i);
  }

  return eats;
}

//////////////// ROOK ////////////////

function rookMoves(square, squares) {
  const moves = [];
  const eats = [];
  const player = squares[square].player;
  const pos = new Position(square);

  // vers le bas
  while (pos.addX(1) && !squares[pos.i]) {
    moves.push(pos.i);
  }
  if (squares[pos.i] && squares[pos.i].player !== player) {
    eats.push(pos.i);
  }


  // vers le haut
  pos.setI(square);
  while (pos.addX(-1) && !squares[pos.i]) {
    moves.push(pos.i);
  }
  if (squares[pos.i] && squares[pos.i].player !== player) {
    eats.push(pos.i);
  }

  // droite
  pos.setI(square);
  while (pos.addY(1) && !squares[pos.i]) {
    moves.push(pos.i);
  }
  if (squares[pos.i] && squares[pos.i].player !== player) {
    eats.push(pos.i);
  }

  // gauche
  pos.setI(square);
  while (pos.addY(-1) && !squares[pos.i]) {
    moves.push  (pos.i);
  }
  if (squares[pos.i] && squares[pos.i].player !== player) {
    eats.push(pos.i);
  }

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

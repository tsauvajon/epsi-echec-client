import { PieceEnum, getX, getY, getId } from './util';

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
        return [];
    }
  }
}

function pieceEats(){}

//////////////// PAWN ////////////////

// TODO : check check (sans mauvais jeu de mot)
function pawnMoves(square, squares) {
  const player = squares[square].player;
  const moves = [];
  const x = getX(square);
  const y = getY(square);

  if (player === "white") {
    let testOne = getId(x, y - 1);
    if(testOne >= 0 && !squares[testOne]) {
      moves = [ ...moves, testOne];
      if(y === 6) {
        let testTwo = getId(x, 4);
        if (!squares[testTwo]) {
          moves = [ ...moves, testTwo];
        }
      }
    }
  }
  else {
    let testOne = getId(x, y + 1);
    if(testOne < 64 && !squares[testOne]) {
      moves = [ ...moves, testOne];
      if(y === 1) {
        let testTwo = getId(x, 3);
        if (!squares[testTwo]) {
          moves = [ ...moves, testTwo];
        }
      }
    }
  }

  return moves;
}

function pawnEats(square, player) {
  return [];
}

//////////////// ROOK ////////////////

function rookMoves() {}

// function rookEats() {}

//////////////// KNIGHT ////////////////

function knightMoves() {}

// eats

//////////////// BISHOP ////////////////

function bishopMoves() {}

// eats

//////////////// KING ////////////////

function kingMoves() {}

// eats

//////////////// QUEEN ////////////////

function queenMoves() {}

// eats

export { pieceMoves, pieceEats };

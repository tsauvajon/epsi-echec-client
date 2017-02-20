import { PieceEnum, getX, getY, getId } from './util';

function pieceMoves(square, player, squares){
  if (squares[square]){
    switch (squares[square].piece) {
      case PieceEnum.PAWN:
        return pawnMoves(square, player, squares);

      case PieceEnum.ROOK:
        return rookMoves(square, player, squares);

      case PieceEnum.KNIGHT:
        return knightMoves(square, player, squares);

      case PieceEnum.BISHOP:
        return bishopMoves(square, player, squares);

      default:
        return [];
    }
  }
}

function pieceEats(){}

//////////////// PAWN ////////////////

// TODO : check check (sans mauvais jeu de mot)
function pawnMoves(square, player, squares) {
  let moves = [];
  let x = getX(square);
  let y = getY(square);

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

// moves

// eats

//////////////// QUEEN ////////////////

// moves

// eats

export { pieceMoves, pieceEats };

import { PieceEnum, getX, getY, getId } from './util';

function pieceMoves(piece, square, player){
  switch (piece) {
    case PieceEnum.Pawn:
      return pawnMoves(square, player);
    default:

  }
}

function pawnMoves(square, player) {
  return [];
}

function pawnEats(square, player) {
  return [];
}

export { pieceMoves, pieceEats };

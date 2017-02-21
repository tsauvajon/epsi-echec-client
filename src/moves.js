import { PieceEnum } from './util';
import { knightMoves } from './moves/knight';
import pawnMoves from './moves/pawn';
import { rookMoves } from './moves/rook';
import { bishopMoves } from './moves/bishop';
import { queenMoves } from './moves/queen';
import { kingMoves } from './moves/king';

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

export { pieceMoves, move };

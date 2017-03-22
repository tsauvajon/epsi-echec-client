import { PieceEnum } from '../utility/util';
import knightMoves from './knight';
import pawnMoves from './pawn';
import rookMoves from './rook';
import bishopMoves from './bishop';
import queenMoves from './queen';
import kingMoves from './king';

function move(squares, from, to) {
  const buffer = squares.slice();
  buffer[to] = buffer[from];
  buffer[from] = { id: buffer.id };
  return buffer;
}

function pieceMoves(square, squares) {
  if (squares[square].piece) {
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
  return null;
}

export { pieceMoves, move };

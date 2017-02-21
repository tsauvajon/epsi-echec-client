import { bishopMoves } from './bishop';
import { rookMoves } from './rook';

function queenMoves(square, squares) {
  const bishop = bishopMoves(square, squares);
  const rook = rookMoves(square, squares);
  const moves = [ ...bishop.moves, ...rook.moves];
  const eats = [ ...bishop.eats, ...rook.eats];
  return { moves: moves, eats: eats };
}

export { queenMoves };

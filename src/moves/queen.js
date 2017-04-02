import bishopMoves from './bishop';
import rookMoves from './rook';

function queenMoves(square, squares) {
  const bishop = bishopMoves(square, squares);
  const rook = rookMoves(square, squares);
  const moves = [...bishop.moves, ...rook.moves].sort();
  const eats = [...bishop.eats, ...rook.eats].sort();
  return { moves, eats };
}

export default queenMoves;

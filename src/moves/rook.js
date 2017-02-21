import Position from '../Position';

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

export { rookMoves };

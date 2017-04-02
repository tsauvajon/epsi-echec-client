import Position from '../utility/Position';

function bishopMoves(square, squares) {
  const moves = [];
  const eats = [];
  const player = squares[square].player;
  const pos = new Position(square);

  // bas-droite
  while (pos.addXY(1, 1) && !squares[pos.i].piece) {
    moves.push(pos.i);
  }
  if (squares[pos.i].piece && squares[pos.i].player !== player) {
    eats.push(pos.i);
  }

  // haut-droite
  pos.setI(square);
  while (pos.addXY(1, -1) && !squares[pos.i].piece) {
    moves.push(pos.i);
  }
  if (squares[pos.i].piece && squares[pos.i].player !== player) {
    eats.push(pos.i);
  }

  // bas-gauche
  pos.setI(square);
  while (pos.addXY(-1, 1) && !squares[pos.i].piece) {
    moves.push(pos.i);
  }
  if (squares[pos.i].piece && squares[pos.i].player !== player) {
    eats.push(pos.i);
  }

  // haut-gauche
  pos.setI(square);
  while (pos.addXY(-1, -1) && !squares[pos.i].piece) {
    moves.push(pos.i);
  }
  if (squares[pos.i].piece && squares[pos.i].player !== player) {
    eats.push(pos.i);
  }

  return {
    moves: moves.sort((a, b) => a > b),
    eats: eats.sort((a, b) => a > b),
  };
}

export default bishopMoves;

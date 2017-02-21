import Position from '../Position';

function bishopMoves(square, squares) {
  const moves = [];
  const eats = [];
  const player = squares[square].player;
  const pos = new Position(square);

  // FIXME : vérifier que à la fois addX et addY sont ok
  //

  // bas-droite
  while (pos.addXY(1, 1) && !squares[pos.i]) {
    moves.push(pos.i);
  }
  if (squares[pos.i] && squares[pos.i].player !== player) {
    eats.push(pos.i);
  }

  // haut-droite
  pos.setI(square);
  while (pos.addXY(1, -1) && !squares[pos.i]) {
    moves.push(pos.i);
  }
  if (squares[pos.i] && squares[pos.i].player !== player) {
    eats.push(pos.i);
  }

  // bas-gauche
  pos.setI(square);
  while (pos.addXY(-1, 1) && !squares[pos.i]) {
    moves.push(pos.i);
  }
  if (squares[pos.i] && squares[pos.i].player !== player) {
    eats.push(pos.i);
  }

  // haut-gauche
  pos.setI(square);
  while (pos.addXY(-1, -1) && !squares[pos.i]) {
    moves.push(pos.i);
  }
  if (squares[pos.i] && squares[pos.i].player !== player) {
    eats.push(pos.i);
  }

  return { moves, eats };
}

export default bishopMoves;

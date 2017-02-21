import Position from '../Position';
import { getX, getY, getId } from '../util';

function pawnMoves(square, squares) {
  const player = squares[square].player;
  return { moves: pawnDeplacements(square, squares, player), eats: pawnEats(square, squares, player) }
}

function pawnDeplacements(square, squares, player) {
  const moves = [];
  const x = getX(square);
  const y = getY(square);

  // testOne : +1 case
  // testTwo : +2 cases (doit être dans la ligne de départ)
  if (player === "white") {
    let testOne = getId(x, y - 1);
    if(testOne >= 0 && !squares[testOne]) {
      moves.push(testOne);
      if(y === 6) {
        let testTwo = getId(x, 4);
        if (!squares[testTwo]) {
          moves.push(testTwo);
        }
      }
    }
  }
  else {
    let testOne = getId(x, y + 1);
    if(testOne < 64 && !squares[testOne]) {
      moves.push(testOne);
      if(y === 1) {
        let testTwo = getId(x, 3);
        if (!squares[testTwo]) {
          moves.push(testTwo);
        }
      }
    }
  }

  return moves;
}

function pawnEats(square, squares, player) {
  const eats = [];
  const pos = new Position(square);

  if (player === "white") {
    // haut gauche
    if (pos.addY(-1) && pos.addX(-1) && squares[pos.i] && squares[pos.i].player !== player)
      eats.push(pos.i);

    pos.setI(square);

    // haut droite
    if (pos.addY(-1) && pos.addX(1) && squares[pos.i] && squares[pos.i].player !== player)
      eats.push(pos.i);
  }
  else {
    // bas gauche
    if (pos.addY(1) && pos.addX(-1) && squares[pos.i] && squares[pos.i].player !== player)
      eats.push(pos.i);

    pos.setI(square);

    // bas droite
    if (pos.addY(1) && pos.addX(1) && squares[pos.i] && squares[pos.i].player !== player)
      eats.push(pos.i);
  }

  return eats;
}

export { pawnMoves };

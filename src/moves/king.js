import Position from '../Position';

function kingMoves(square, squares) {
  const moves = [];
  const eats = [];
  const player = squares[square].player;
  const pos = new Position(square);

  // bas-droite
  if (pos.addX(1) && pos.addY(1)) {
    if (!squares[pos.i].piece) {
      moves.push(pos.i);
    } else if (squares[pos.i].piece && squares[pos.i].player !== player) {
      eats.push(pos.i);
    }
  }

  // haut-droite
  pos.setI(square);
  if (pos.addX(1) && pos.addY(-1)) {
    if (!squares[pos.i].piece) {
      moves.push(pos.i);
    } else if (squares[pos.i].piece && squares[pos.i].player !== player) {
      eats.push(pos.i);
    }
  }

  // bas-gauche
  pos.setI(square);
  if (pos.addX(-1) && pos.addY(1)) {
    if (!squares[pos.i].piece) {
      moves.push(pos.i);
    } else if (squares[pos.i].piece && squares[pos.i].player !== player) {
      eats.push(pos.i);
    }
  }

  // haut-gauche
  pos.setI(square);
  if (pos.addX(-1) && pos.addY(-1)) {
    if (!squares[pos.i].piece) {
      moves.push(pos.i);
    } else if (squares[pos.i].piece && squares[pos.i].player !== player) {
      eats.push(pos.i);
    }
  }

  // bas
  if (pos.addY(1)) {
    if (!squares[pos.i].piece) {
      moves.push(pos.i);
    } else if (squares[pos.i].piece && squares[pos.i].player !== player) {
      eats.push(pos.i);
    }
  }

  // haut
  pos.setI(square);
  if (pos.addY(-1)) {
    if (!squares[pos.i].piece) {
      moves.push(pos.i);
    } else if (squares[pos.i].piece && squares[pos.i].player !== player) {
      eats.push(pos.i);
    }
  }

  // gauche
  pos.setI(square);
  if (pos.addX(-1)) {
    if (!squares[pos.i].piece) {
      moves.push(pos.i);
    } else if (squares[pos.i].piece && squares[pos.i].player !== player) {
      eats.push(pos.i);
    }
  }

  // droite
  pos.setI(square);
  if (pos.addX(1)) {
    if (!squares[pos.i].piece) {
      moves.push(pos.i);
    } else if (squares[pos.i].piece && squares[pos.i].player !== player) {
      eats.push(pos.i);
    }
  }

  return { moves, eats };
}

export default kingMoves;

import Position from '../utility/Position';

function knightMoves(square, squares) {
  const player = squares[square].player;
  const eats = [];
  const moves = [];
  const pos = new Position(square);
  // toutes les combinaisons 1/-1 <=> 2/-2 soit 8 combinaisons en tout

  for (let x = -2; x < 3; x += 1) {
    if (x !== 0) {
      let y;

      if (x < 0) {
        y = (3 + x);
      } else if (x > 0) {
        y = (3 - x);
      }

      pos.setI(square);
      // +y
      if (pos.addX(x) && pos.addY(y)) {
        if (!squares[pos.i].piece) {
          moves.push(pos.i);
        } else if (squares[pos.i].player !== player) {
          eats.push(pos.i);
        }
      }

      pos.setI(square);
      // -y
      if (pos.addX(x) && pos.addY(-y)) {
        if (!squares[pos.i].piece) {
          moves.push(pos.i);
        } else if (squares[pos.i].player !== player) {
          eats.push(pos.i);
        }
      }
    }
  }

  return {
    moves: moves.sort((a, b) => a > b),
    eats: eats.sort((a, b) => a > b),
  };
}

export default knightMoves;

import Position from '../utility/Position';

const kingMoves = (square, squares, castling = []) => {
  const moves = [];
  const eats = [];
  const player = squares[square].player;
  const pos = new Position(square);

  // console.log(squares, 'castling:', castling);

  let availableCastles = [];
  // ajout des moves de castling (roque)
  if (player === 'white' && square === 60) {
    // possibilité de castle du joueur BLANC uniquement
    availableCastles = castling.filter(x => x > 32);
  } else if (player === 'black' && square === 4) {
    // possibilité de castle du joueur NOIR uniquement
    availableCastles = castling.filter(x => x < 32);
  }

  availableCastles.forEach((i) => {
    let empty = true;
    let start;
    let step;
    if (i < 60) {
      start = 57;
      step = 1;
    } else {
      start = 62;
      step = -1;
    }
    for (let j = start; j !== 60 && empty; j += step) {
      // si la case est remplie :
      if (squares[j].piece) {
        empty = false;
      }
    }
    if (empty) {
      moves.push(i);
    }
  });

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
  pos.setI(square);
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

  return {
    moves: moves.sort((a, b) => a > b),
    eats: eats.sort((a, b) => a > b),
  };
};

export default kingMoves;

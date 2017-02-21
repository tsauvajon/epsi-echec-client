import { PieceEnum } from './util';
import { pieceMoves } from './moves';

// la fonction vérifie si un joueur est en échec
function checkCheck(squares, player) {
  // pour chaque pièce du player adverse : vérifier si le roi du player en cours est menacé
  let king = null;
  const eatenBy = [];
  for (let i = 0; i < 64; i += 1) {
    if (squares[i]) {
      if (squares[i].player !== player) {
        // executer pieceEats dessus
        if (pieceMoves(i, squares).eats) {
          eatenBy.push(i);
        }
      } else if (squares[i].piece === PieceEnum.KING) {
        king = i;
      }
    }
  }
  if (!king) {
    throw new Error('checkCheck : no king for the player');
  }
  return eatenBy;
}

function assessCheck(squareFrom, squareTo, squares) {
  if (!squares[squareFrom]) {
    throw new Error("invalid 'from' square");
  }
  const player = squares[squareFrom].player;
  const buffer = squares.slice();
  buffer[squareTo] = squares[squareFrom];
  buffer[squareFrom] = null;
  return checkCheck(buffer, player);
}

export { assessCheck, checkCheck };

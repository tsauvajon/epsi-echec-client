import { PieceEnum } from './util';
import { pieceMoves, move } from './moves';

function findTheKing(squares, player) {
  let king = null;
  for (let s = 0; s < 64; s += 1) {
    if (
      squares[s].piece
      && squares[s].piece === PieceEnum.KING
      && squares[s].player === player
    ) {
      king = s;
    }
  }

  if (!king) {
    throw new Error('checkCheck : no king for the player');
  }
  return king;
}

// la fonction vérifie si un joueur est en échec
function checkCheck(squares, player) {
  // pour chaque pièce du player adverse : vérifier si le roi du player en cours est menacé

  // etape 1 : trouver le roi du joueur en cours
  const king = findTheKing(squares, player);

  // etape 2 : trouver les pièces de l'autre joueur qui bouffent ce roi
  const eatenBy = [];
  for (let s = 0; s < 64; s += 1) {
    if (squares[s].piece && squares[s].player !== player) {
      // regarder s'il mange le roi
      if (pieceMoves(s, squares).eats.includes(king)) {
        eatenBy.push(s);
      }
    }
  }

  return eatenBy;
}

function assessCheck(squares, squareFrom, squareTo) {
  if (!squares[squareFrom].piece) {
    throw new Error("invalid 'from' square");
  }
  const player = squares[squareFrom].player;
  const buffer = move(squares, squareFrom, squareTo);
  return checkCheck(buffer, player);
}

export { assessCheck, checkCheck, findTheKing };

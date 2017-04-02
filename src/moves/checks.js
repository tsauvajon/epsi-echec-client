import { PieceEnum } from '../utility/util';
import { pieceMoves, move } from './index';

const findTheKing = (squares, player) => {
  let king = null;
  // FIXME: remplacer par un foreach
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
};

// la fonction vérifie si un joueur est en échec
// Renvoie un tableau de pieces qui mettent le roi en échec
const checkCheck = (squares, player) => {
  // pour chaque pièce du player adverse : vérifier si le roi du player en cours est menacé

  // etape 1 : trouver le roi du joueur en cours
  const king = findTheKing(squares, player);

  // etape 2 : trouver les pièces de l'autre joueur qui bouffent ce roi
  const eatenBy = [];
  // FIXME: remplacer par un foreach
  for (let s = 0; s < 64; s += 1) {
    if (squares[s].piece && squares[s].player !== player) {
      // regarder s'il mange le roi
      if (pieceMoves(s, squares).eats.includes(king)) {
        eatenBy.push(s);
      }
    }
  }

  return eatenBy;
};

// regarde si, en jouant un coup précis, le joueur qui joue ce coup est en échec
// renvoie la liste des pieces qui mettent en échec le cas échant, sinon
// un tableau vide
const assessCheck = (squares, squareFrom, squareTo) => {
  if (!squares[squareFrom].piece) {
    throw new Error("invalid 'from' square");
  }
  if (squares[squareTo].piece && squares[squareTo].piece === PieceEnum.KING) {
    return { eats: [], moves: [] };
  }
  const player = squares[squareFrom].player;
  const buffer = move(squares, squareFrom, squareTo);
  return checkCheck(buffer, player);
};

// renvoie true si 'player' est échec et mat
const checkMate = (squares, player) => {
  const pieces = [];
  for (let s = 0; s < squares.length; s += 1) {
    if (squares[s].player && squares[s].player === player) {
      pieces.push(s);
    }
  }
  // on parcourt chaque pièce du joueur en échec
  for (let p = 0; p < pieces.length; p += 1) {
    const moves = pieceMoves(pieces[p], squares);
    // si le joueur a le moindre déplacement qui fait qu'il n'est pas en échec,
    // alors pas échec et mat
    for (let e = 0; e < moves.eats.length; e += 1) {
      const hasEats = assessCheck(squares, pieces[p], moves.eats[e]);
      if (hasEats.length === 0) return false;
    }
    for (let m = 0; m < moves.moves.length; m += 1) {
      const hasMoves = assessCheck(squares, pieces[p], moves.moves[m]);
      if (hasMoves.length === 0) return false;
    }
  }
  return true;
};

export { assessCheck, checkCheck, findTheKing, checkMate };

function assessCheck(squareFrom, squareTo, squares) {
    if (!squares[squareFrom])
      throw "invalid 'from' square";
    const player = squares[squareFrom].player;
    const buffer = squares.slice();
    buffer[squareTo] = squares[squareFrom];
    buffer[squareFrom] = null;
    return checkCheck(buffer, player);
}

// la fonction vérifie si un joueur est en échec
function checkCheck(squares, player) {

  // pour chaque pièce du player adverse : vérifier si le roi du player en cours est menacé
  let king = null;
  const eats = [];
  for (let i = 0; i < 64; i++) {
    if (square[i]){
      if (square[i].player != player) {
        // executer pieceEats dessus
        if (pieceEats(i, buffer)) {
          eatenBy = [ ...eatenBy, i];
        }
      }
      else if (square[i].piece === PieceEnum.KING) {
        king = i;
      }
    }
  }
  if (!king)
    throw "checkCheck : no king for the player";
  return eatenBy;
}

export { assesCheck, checkCheck };

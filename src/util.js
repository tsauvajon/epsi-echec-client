const PieceEnum = Object.freeze({
  KING: 'king',
  QUEEN: 'queen',
  ROOK: 'rook',
  BISHOP: 'bishop',
  KNIGHT: 'knight',
  PAWN: 'pawn',
});

// crée le board par défaut (placement initial)
function getDefaultPieces() {
  // définit la couleur de la pièce
  const definePlayer = function definePlayer(i) {
    if (i < 16) {
      return 'black';
    } else if (i > 63 - 16) {
      return ('white');
    }

    return undefined;
  };

  // on définit le type de la pièce (grâce à la symétrie)
  // x = pièce haut gauche; 7-x = symétrie horizontale; 63-x = symétrie verticale
  const definePiece = function definePiece(i) {
    // pions : 8 -> 15 et symétrie
    if ((i >= 8 && i <= 15) || (i >= 63 - 15 && i <= 63 - 8)) {
      return PieceEnum.PAWN;
    }

    switch (i) {
      case 0:
      case 7 - 0:
      case 63 - 0:
      case (63 - 7) + 0:
        return PieceEnum.ROOK;
      case 1:
      case 7 - 1:
      case 63 - 1:
      case (63 - 7) + 1:
        return PieceEnum.KNIGHT;
      case 2:
      case 7 - 2:
      case 63 - 2:
      case (63 - 7) + 2:
        return PieceEnum.BISHOP;
      case 3:
      case 59:
        return PieceEnum.QUEEN;
      case 4:
      case 60:
        return PieceEnum.KING;
      default:
        return undefined;
    }
  };

  // on déclare un Array de 64 élements
  // puis on applique les fonctions de définition sur chacun des squares
  return [...Array(64)].map((_, i) => ({
    player: definePlayer(i),
    piece: definePiece(i),
  }));
}

function getX(i) {
  return i % 8;
}

function getY(i) {
  return parseInt(i / 8, 10);
}

function getId(x, y) {
  return (y * 8) + x;
}

export { PieceEnum, getX, getY, getId, getDefaultPieces };

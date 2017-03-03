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
  const defineSquare = function defineSquare(s, i) {
    const sq = { };

    // on définit la couleur de la pièce
    if (i < 16) {
      sq.player = 'black';
    } else if (i > 63 - 16) {
      sq.player = 'white';
    }

    // on définit le type de la pièce (grâce à la symétrie)
    // x = pièce haut gauche; 7-x = symétrie horizontale; 63-x = symétrie verticale
    switch (i) {
      case 0:
      case 7 - 0:
      case 63 - 0:
      case (63 - 7) + 0:
        sq.piece = PieceEnum.ROOK;
        break;
      case 1:
      case 7 - 1:
      case 63 - 1:
      case (63 - 7) + 1:
        sq.piece = PieceEnum.KNIGHT;
        break;
      case 2:
      case 7 - 2:
      case 63 - 2:
      case (63 - 7) + 2:
        sq.piece = PieceEnum.BISHOP;
        break;
      case 3:
      case 59:
        sq.piece = PieceEnum.QUEEN;
        break;
      case 4:
      case 60:
        sq.piece = PieceEnum.KING;
        break;
      default:
        break;
    }

    // pions : 8 -> 15 et symétrie
    if ((i >= 8 && i <= 15) || (i >= 63 - 15 && i <= 63 - 8)) {
      sq.piece = PieceEnum.PAWN;
    }
    return sq;
  };

  // on déclare un Array de 64 élements
  // puis on applique la fonction de définition sur chacun des squares
  const squares = [...Array(64)].map(defineSquare);
  return squares;
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

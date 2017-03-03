const PieceEnum = Object.freeze({
  KING: 'king',
  QUEEN: 'queen',
  ROOK: 'rook',
  BISHOP: 'bishop',
  KNIGHT: 'knight',
  PAWN: 'pawn',
});

// crée le board par défaut (placement initial)
/*
  TODO : refactor avec array.filter() ??; ex:  [2, 4, 6].filter(gt4).map(double); [8, 12]
*/
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
  // 63-x = symétrie centrale
  // TODO : refactor : au lieu de symétrie centrale on fait une symétrie horizontale
  const definePiece = function definePiece(i) {
    // les rois et dames ne sont pas symétriques
    switch (i) {
      case 3:
      case 59:
        return PieceEnum.QUEEN;
      case 4:
      case 60:
        return PieceEnum.KING;
      default: break;
    }

    const half = function half(j) {
      if (j >= 8 && j <= 15) {
        return PieceEnum.PAWN;
      }

      switch (j) {
        case 0:
        case 7 - 0:
          return PieceEnum.ROOK;
        case 1:
        case 7 - 1:
          return PieceEnum.KNIGHT;
        case 2:
        case 7 - 2:
          return PieceEnum.BISHOP;
        default:
          return undefined;
      }
    };

    return half(i) || half(63 - i) || undefined;
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

const PieceEnum = Object.freeze({
  KING: 'king',
  QUEEN: 'queen',
  ROOK: 'rook',
  BISHOP: 'bishop',
  KNIGHT: 'knight',
  PAWN: 'pawn',
});

function getDefaultPieces() {
  const squares = Array(64);
  for (let s = 0; s < squares.length; s += 1) {
    squares[s] = { };
  }
  const w = 'white';
  const b = 'black';

  squares[56] = { piece: PieceEnum.ROOK, player: w };
  squares[63] = { piece: PieceEnum.ROOK, player: w };
  squares[57] = { piece: PieceEnum.KNIGHT, player: w };
  squares[62] = { piece: PieceEnum.KNIGHT, player: w };
  squares[58] = { piece: PieceEnum.BISHOP, player: w };
  squares[61] = { piece: PieceEnum.BISHOP, player: w };
  squares[59] = { piece: PieceEnum.QUEEN, player: w };
  squares[60] = { piece: PieceEnum.KING, player: w };
  for (let i = 48; i < 56; i += 1) {
    squares[i] = { piece: PieceEnum.PAWN, player: w };
  }

  squares[0] = { piece: PieceEnum.ROOK, player: b };
  squares[7] = { piece: PieceEnum.ROOK, player: b };
  squares[1] = { piece: PieceEnum.KNIGHT, player: b };
  squares[6] = { piece: PieceEnum.KNIGHT, player: b };
  squares[2] = { piece: PieceEnum.BISHOP, player: b };
  squares[5] = { piece: PieceEnum.BISHOP, player: b };
  squares[3] = { piece: PieceEnum.QUEEN, player: b };
  squares[4] = { piece: PieceEnum.KING, player: b };
  for (let i = 8; i < 16; i += 1) {
    squares[i] = { piece: PieceEnum.PAWN, player: b };
  }

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

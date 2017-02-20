const PieceEnum = Object.freeze({
  KING: 1,
  QUEEN: 2,
  ROOK: 3,
  BISHOP: 4,
  KNIGHT: 5,
  PAWN: 6,
});

function getX(i) {
  return i%8;
}
function getY(i) {
  return parseInt(i/8, 10);
}
function getId(x, y) {
  return y*8+x;
}

export { getX, getY, getId, PieceEnum };

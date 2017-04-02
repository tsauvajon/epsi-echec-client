const movePiece = (from, to) => ({
  type: 'MOVE_PIECE',
  from,
  to,
});

const addPiece = (id, player, piece) => ({
  type: 'ADD_PIECE',
  id,
  player,
  piece,
});

const removePiece = id => ({
  type: 'REMOVE_PIECE',
  id,
});

export { movePiece, addPiece, removePiece };

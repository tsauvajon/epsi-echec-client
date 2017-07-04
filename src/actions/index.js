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

const cleanClasses = () => ({
  type: 'CLEAN_CLASSES',
});

const addClass = (id, name) => ({
  type: 'ADD_CLASS',
  id,
  name,
});

const selectPiece = id => ({
  type: 'SELECT_PIECE',
  id,
});

const unselectPiece = () => ({
  type: 'UNSELECT_PIECE',
});

const switchPlayer = nextPlayer => ({
  type: 'SWITCH_PLAYER',
  nextPlayer,
});

const removeCastlingPossibility = id => ({
  type: 'REMOVE_CASTLING_POSSIBILITY',
  id,
}) ;

export {
  movePiece,
  addPiece,
  removePiece,
  cleanClasses,
  addClass,
  selectPiece,
  unselectPiece,
  switchPlayer,
  removeCastlingPossibility,
};

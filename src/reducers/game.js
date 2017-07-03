const removeCastling = (i, { castling }) => {
  // si le tableau est déjà vide pas la peine de vérifier
  if (!castling.length) return [];
  // black king bouge ou est échec : on supprime ses 2 possiblités de roque
  if (i === 4) {
    // on vide 1 et 6 du tableau
    return castling
      .filter(item => item !== 0 && item !== 7);
  } else if (i === 60) {
    // white king : on supprime ses 2 possiblités de roque
    return castling
      .filter(item => item !== 56 && item !== 63);
  }
  return castling.filter(item => item !== i);
};

const game = (state, action) => {
  switch (action.type) {
    case 'SWITCH_PLAYER':
      return {
        ...state,
        nextPlayer: state.nextPlayer === 'black' ? 'white' : 'black',
      };
    case 'REMOVE_CASTLING_POSSIBILITY':
      return {
        ...state,
        castling: removeCastling(action.id, state),
      };
    case 'SELECT_PIECE':
      return {
        ...state,
        selected: action.id,
      };
    default:
      return state;
  }
};

export default game;

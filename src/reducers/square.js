const square = (state = [], { type, id, player, piece }) => {
  switch (type) {
    case 'ADD_PIECE':
      if (state.id !== id) {
        return state;
      }
      return {
        id,
        player,
        piece,
      };
    case 'REMOVE_PIECE':
      if (state.id !== id) {
        return state;
      }
      return {
        id,
      };
    default:
      return state;
  }
};

export default square;

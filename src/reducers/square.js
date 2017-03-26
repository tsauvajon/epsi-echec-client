// TODO
const square = (state = [], action) => {
  switch (action.type) {
    case 'MOVE_PIECE':
      return state; // TODO
    case 'ADD_PIECE':
      if (state.id !== action.id) {
        return state;
      }

      return {
        id: action.id,
        player: action.player,
        piece: action.piece,
      };
    case 'REMOVE_PIECE':
      if (state.id !== action.id) {
        return state;
      }

      return {
        id: action.id,
      };
    default:
      return state;
  }
};

export default square;

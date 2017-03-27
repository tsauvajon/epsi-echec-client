import square from './square';

// MOVE = ADD then REMOVE
const squares = (state = [], action) => {
  switch (action.type) {
    case 'MOVE_PIECE':
      return state.map(s =>
        square(s, {
          type: 'ADD_PIECE',
          id: action.to,
          player: state[action.from].player,
          piece: state[action.from].piece,
        }),
      ).map(s =>
        square(s, {
          type: 'REMOVE_PIECE',
          id: action.from,
        }),
      );
    case 'ADD_PIECE':
    case 'REMOVE_PIECE':
      return state.map(s =>
        square(s, action));
    default:
      return state;
  }
};

export default squares;

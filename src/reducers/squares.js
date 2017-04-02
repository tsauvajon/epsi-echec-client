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
    case 'CLEAN_CLASSES':
      return state.map(
          s => ({
            ...s,
            classes: undefined,
          }),
        );
    case 'ADD_CLASS':
      return state.map(
          (s) => {
            if (s.id === action.squareId) {
              const newSquare = { ...s };
              if (!newSquare.classes) {
                newSquare.classes = [action.class];
              } else {
                newSquare.classes.push(action.class);
              }
              return newSquare;
            }
            return s;
          },
        );
    default:
      return state;
  }
};

export default squares;

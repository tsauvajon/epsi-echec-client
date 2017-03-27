import square from './square';

// MOVE = ADD then REMOVE
const squares = (state = [], action) => {
  switch (action.type) {
    case 'MOVE_PIECE':
      return {
        ...state,
        squares: state.squares.map(s =>
          square(s, {
            type: 'ADD_PIECE',
            id: action.to,
            player: state.squares[action.from].player,
            piece: state.squares[action.from].piece,
          }),
        ).map(s =>
          square(s, {
            type: 'REMOVE_PIECE',
            id: action.from,
          }),
        ),
      };
    case 'ADD_PIECE':
    case 'REMOVE_PIECE':
      return {
        ...state,
        squares: state.squares.map(s =>
          square(s, action)),
      };
    case 'CLEAN_CLASSES':
      return {
        ...state,
        squares: state.squares.map(
          s => ({
            ...s,
            classes: undefined,
          }),
        ),
      };
    case 'ADD_CLASS':
      return {
        ...state,
        squares: state.squares.map(
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
        ),
      };
    default:
      return state;
  }
};

export default squares;

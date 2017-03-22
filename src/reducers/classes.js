const classes = (state = [], action) => {
  switch (action.type) {
    case 'CLEAN_CLASSES':
      return state.squares.map(
        (square) => {
          const newSquare = square;
          delete newSquare.classes;
          return newSquare;
        },
      );
    case 'ADD_CLASS':
      return state.squares.map(
        (square) => {
          if (square.id === action.squareId) {
            const newSquare = { ...square };
            if (!newSquare.classes) {
              newSquare.classes = [action.class];
            } else {
              newSquare.classes.push(action.class);
            }
            return newSquare;
          }
          return square;
        },
      );
    default:
      return state;
  }
};

export default classes;

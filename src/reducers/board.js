import squares from './squares';

const board = (state = [], action) => {
  const newSquares = state.squares;
  return { ...state, squares: squares(newSquares, action) };
};

export default board;

import squares from './squares';

const board = (state = [], action) => {
  const newSquares = state.squares;
  return squares(newSquares, action);
};

export default board;

import square from './square';

// TODO refactor this
const move = (state, from, to) => {
  const buffer = state.slice();
  buffer[to] = { ...buffer[from], id: state[to].id };
  buffer[from] = { id: state[from].id };
  return buffer;
};

const squares = (state = [], action) => {
  switch (action.type) {
    case 'MOVE_PIECE':
      return move(state, action.from, action.to);
    case 'ADD_PIECE':
    case 'REMOVE_PIECE':
      return state.map(s =>
        square(s, action));
    default:
      return state;
  }
};

export default squares;

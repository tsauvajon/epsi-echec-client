const move = (state, from, to) => {
  const buffer = state.slice();
  buffer[to] = buffer[from];
  buffer[from] = { id: buffer.id };
  return buffer;
};

const squares = (state = [], action) => {
  switch (action.type) {
    case 'MOVE_PIECE':
      return move(state, action.from, action.to);
    default:
      return state;
  }
};

export default squares;

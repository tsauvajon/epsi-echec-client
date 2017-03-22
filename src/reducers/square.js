const square = (state = [], action) => {
  switch (action.type) {
    case 'MOVE_PIECE':
      return true;
    default:
      return state;
  }
};

export default square;

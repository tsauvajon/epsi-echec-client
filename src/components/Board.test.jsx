import React from 'react';
import renderer from 'react-test-renderer';
import Board from '../components/Board';
import { Provider } from 'react-redux';
import store from '../utility/store';

it('renders Board correctly', () => {
  const squares = store.getState().squares;
  const board = renderer.create(
    <Provider store={store}>
      <Board player="white" squares={squares} onClick={() => {}} />
    </Provider>,
  ).toJSON();

  // Test onClick prop of the 1st square
  board.children[0].children[0].children[0].props.onClick();

  expect(board).toMatchSnapshot();
});

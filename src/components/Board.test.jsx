import React from 'react';
import renderer from 'react-test-renderer';
import Board from '../components/Board';
import store from '../utility/store';

it('renders Board correctly', () => {
  const squares = store.getState().squares;
  const board = renderer.create(
    <Board player="white" squares={squares} onClick={() => {}} />,
  ).toJSON();

  // Test onClick prop of the 1st square
  board.children[0].children[0].children[0].props.onClick();

  expect(board).toMatchSnapshot();
});

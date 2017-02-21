import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Game from './Game';
import renderer from 'react-test-renderer';
import { getX, getY, getId } from './util';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('renders correctly for both players', () => {
  const white = renderer.create(
    <Game player="white" />
  ).toJSON();
  expect(white).toMatchSnapshot();

  const black = renderer.create(
    <Game player="black" />
  ).toJSON();
  expect(black).toMatchSnapshot();
});

it('gets positions correctly', () => {
  expect(getX(8)).toEqual(0);
  expect(getY(8)).toEqual(1);

  expect(getX(35)).toEqual(3);
  expect(getY(35)).toEqual(4);

  expect(getX(59)).toEqual(3);
  expect(getY(59)).toEqual(7);

  expect(getId(getX(44), getY(44))).toEqual(44);
  expect(getId(getX(55), getY(55))).toEqual(55);
  expect(getId(getX(29), getY(29))).toEqual(29);
});

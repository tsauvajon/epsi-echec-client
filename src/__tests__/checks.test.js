import { move } from '../moves';
import { assessCheck, checkCheck } from '../checks';
import { getDefaultPieces } from '../util';

const defaultBoard = getDefaultPieces();

it('checks check', () => {
  const testBoard = move(defaultBoard, 3, 53);
  const check = checkCheck(testBoard, 'white');
  expect(check).toMatchSnapshot();
});

it('assesses check', () => {
  const check = assessCheck(defaultBoard, 4, 53);
  expect(check).toMatchSnapshot();
});

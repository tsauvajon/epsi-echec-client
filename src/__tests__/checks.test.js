import { move } from '../moves';
import { assessCheck, checkCheck, checkMate } from '../checks';
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

it('correctly evaluates real checkmates', () => {
  const testBoardCheckMate = move(move(defaultBoard, 62, 30), 59, 13);
  const shouldCheckMake = checkMate(testBoardCheckMate, 'black');
  expect(shouldCheckMake).toEqual(true);
});

it('doesn t assess false checkmates', () => {
  const testBoardNotMate = move(defaultBoard, 62, 14);
  const shouldNotCheckMake = checkMate(testBoardNotMate, 'black');
  expect(shouldNotCheckMake).toEqual(false);
});

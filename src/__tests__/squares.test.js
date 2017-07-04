import deepFreeze from 'deep-freeze';
import squares from '../reducers/squares';
import { PieceEnum } from '../utility/util';
import {
  movePiece,
  addPiece,
  removePiece,
  cleanClasses,
  addClass,
} from '../actions';

describe('squares reducer', () => {
  describe('pieces', () => {
    it('adds a piece', () => {
      const stateBefore = { squares: [
        { id: 0 },
        { id: 1 },
      ] };

      const stateAfter = { squares: [
        { id: 0 },
        {
          id: 1,
          player: 'white',
          piece: PieceEnum.QUEEN,
        },
      ] };

      deepFreeze(stateBefore);

      expect(
        squares(stateBefore.squares, addPiece(1, 'white', PieceEnum.QUEEN)),
      ).toEqual(stateAfter.squares);
    });

    it('removes a piece', () => {
      const stateBefore = { squares: [
        { id: 0 },
        {
          id: 1,
          player: 'white',
          piece: PieceEnum.QUEEN,
        },
      ] };

      const stateAfter = { squares: [
        { id: 0 },
        { id: 1 },
      ] };

      deepFreeze(stateBefore);

      expect(
        squares(stateBefore.squares, removePiece(1)),
      ).toEqual(stateAfter.squares);
    });

    it('moves a piece', () => {
      const stateBefore = { squares: [
        { id: 0 },
        {
          id: 1,
          player: 'white',
          piece: PieceEnum.QUEEN,
        },
      ] };

      const stateAfter = { squares: [
        {
          id: 0,
          player: 'white',
          piece: PieceEnum.QUEEN,
        },
        { id: 1 },
      ] };

      deepFreeze(stateBefore);

      expect(
        squares(stateBefore.squares, movePiece(1, 0)),
      ).toEqual(stateAfter.squares);
    });


    it('moves a piece back and forth', () => {
      const stateBefore = { squares: [
        { id: 0 },
        {
          id: 1,
          player: 'white',
          piece: PieceEnum.QUEEN,
        },
      ] };

      deepFreeze(stateBefore);

      const squaresAfter = squares(
        squares(
        squares(
        squares(
          stateBefore.squares,
          movePiece(1, 0)),
          movePiece(0, 1)),
          movePiece(1, 0)),
          movePiece(0, 1),
      );

      expect(
        stateBefore.squares,
      ).toEqual(squaresAfter);
    });
  });

  describe('classes', () => {
    it('adds a class', () => {
      const stateBefore = { squares: [
        { id: 0 },
        { id: 1 },
      ] };

      const stateAfter = { squares: [
        { id: 0 },
        {
          id: 1,
          classes: [
            'test',
          ],
        },
      ] };

      deepFreeze(stateBefore);

      expect(
        squares(stateBefore.squares, addClass(1, 'test')),
      ).toEqual(stateAfter.squares);
    });

    it('cleans classes', () => {
      const stateBefore = {
        squares: [
          { id: 0, classes: ['a', 'b', 'c'] },
          { id: 1, classes: ['a', 'd', 'e'] },
          { id: 2, classes: ['avcdcd'] },
          { id: 3 },
        ],
      };

      const stateAfter = {
        squares: [
          { id: 0 },
          { id: 1 },
          { id: 2 },
          { id: 3 },
        ],
      };

      deepFreeze(stateBefore);

      expect(
        squares(stateBefore.squares, cleanClasses()),
      ).toEqual(stateAfter.squares);
    });
  });
});

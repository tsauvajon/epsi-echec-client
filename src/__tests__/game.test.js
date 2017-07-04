import deepFreeze from 'deep-freeze';

import game from '../reducers/game';
import {
  selectPiece,
  unselectPiece,
  switchPlayer,
  removeCastlingPossibility,
} from '../actions';

describe('game reducer', () => {
  const stateBefore = {
    nextPlayer: 'white',
    selected: null,
    castling: [0, 7, 56, 63],
  };

  deepFreeze(stateBefore);

  it('toggles player black => white', () => {
    const stateAfter = {
      ...stateBefore,
      nextPlayer: 'black',
    };

    expect(
      game(stateBefore, switchPlayer()),
    ).toEqual(stateAfter);
  });

  it('toggles player white => black', () => {
    const state1 = {
      ...stateBefore,
      nextPlayer: 'black',
    };

    deepFreeze(state1);

    const state2 = { ...stateBefore };

    expect(
      game(state1, switchPlayer()),
    ).toEqual(state2);
  });

  it('switches player to black', () => {
    const stateAfter = {
      ...stateBefore,
      nextPlayer: 'black',
    };

    expect(
      game(stateBefore, switchPlayer('black')),
    ).toEqual(stateAfter);
  });

  it('switches player to white', () => {
    // stateAfter === stateBefore
    const stateAfter = {
      ...stateBefore,
      nextPlayer: 'white',
    };

    expect(
      game(stateBefore, switchPlayer('white')),
    ).toEqual(stateAfter);
  });

  it('selects a piece', () => {
    const stateAfter = {
      ...stateBefore,
      selected: 3,
    };

    expect(
      game(stateBefore, selectPiece(3)),
    ).toEqual(stateAfter);
  });

  it('unselects a piece', () => {
    const state1 = {
      ...stateBefore,
      selected: 23,
    };

    deepFreeze(state1);

    // state2 === stateBefore
    const state2 = {
      ...stateBefore,
      selected: null,
    };

    expect(
      game(state1, unselectPiece()),
    ).toEqual(state2);
  });

  describe('removes castling possibilities', () => {
    it('should not change anything when castling is already empty', () => {
      const stateBeforeAndAfter = {
        ...stateBefore,
        castling: [],
      };

      deepFreeze(stateBeforeAndAfter);

      expect(game(stateBeforeAndAfter, removeCastlingPossibility(7)))
        .toEqual(stateBeforeAndAfter);
    });

    // castling: [0, 7, 56, 63]
    it('when black king moves or is check', () => {
      // 4 => should remove 0 and 7
      const stateAfter = {
        ...stateBefore,
        castling: [56, 63],
      };

      expect(
        game(stateBefore, removeCastlingPossibility(4)),
      ).toEqual(stateAfter);
    });

    it('when white king moves or is check', () => {
      // 60 => should remove 56 and 63
      const stateAfter = {
        ...stateBefore,
        castling: [0, 7],
      };

      expect(
        game(stateBefore, removeCastlingPossibility(60)),
      ).toEqual(stateAfter);
    });

    it('when left black tower moves', () => {
      // 0 => should remove 0
      const stateAfter = {
        ...stateBefore,
        castling: [7, 56, 63],
      };

      expect(
        game(stateBefore, removeCastlingPossibility(0)),
      ).toEqual(stateAfter);
    });

    it('when right black tower moves or is check', () => {
      // 7 => should remove 7
      const stateAfter = {
        ...stateBefore,
        castling: [0, 56, 63],
      };

      expect(
        game(stateBefore, removeCastlingPossibility(7)),
      ).toEqual(stateAfter);
    });

    it('when left white tower moves or is check', () => {
      // 56 => should remove 56
      const stateAfter = {
        ...stateBefore,
        castling: [0, 7, 63],
      };

      expect(
        game(stateBefore, removeCastlingPossibility(56)),
      ).toEqual(stateAfter);
    });

    it('when right white tower moves or is check', () => {
      // 63 => should remove 63
      const stateAfter = {
        ...stateBefore,
        castling: [0, 7, 56],
      };

      expect(
        game(stateBefore, removeCastlingPossibility(63)),
      ).toEqual(stateAfter);
    });

    it('should not change when providing any other piece', () => {
      expect(
        game(stateBefore, removeCastlingPossibility(2)),
      ).toEqual(stateBefore);

      expect(
        game(stateBefore, removeCastlingPossibility(5)),
      ).toEqual(stateBefore);

      expect(
        game(stateBefore, removeCastlingPossibility(62)),
      ).toEqual(stateBefore);
    });
  });
});

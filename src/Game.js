import React, { Component } from 'react';
import Board from './Board';

class Game extends Component{
  constructor() {
    super();
    const squares = Array(64).fill(null);
    this.state = {
      squares: squares,
      whiteIsNext: true,
    };
  }
  render() {
    return (
      <div className="game-board" key="game-board">
        <Board squares={ this.state.squares } onClick={ (i) => this.handleClick(i) } />
      </div>
    )
  }
}

var PieceEnum = Object.freeze({
  KING: 1,
  QUEEN: 2,
  ROOK: 3,
  BISHOP: 4,
  KNIGHT: 5,
  PAWN: 6,
});

export default Game;

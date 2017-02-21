import React, { Component } from 'react';
import Board from './Board';
import { getDefaultPieces } from './util';
import { pieceMoves } from './moves';
// import { getX, getY, getId, PieceEnum } from './util';

class Game extends Component {
  constructor() {
    super();
    const squares = getDefaultPieces();
    this.state = {
      squares,
      whiteIsNext: true,
    };
  }
  handleClick(i) {
    this.props.nextPlayer();
    const moves = pieceMoves(i, this.props.player, this.state.squares);
    for (let m = 0; m < moves.moves.length; m += 1) {
      console.log();
    }
  }
  render() {
    return (
      <div className="game" key="game">
        <div className="game-board" key="game-board">
          <Board
            squares={this.state.squares}
            player={this.props.player || 'white'}
            onClick={i => this.handleClick(i)}
          />
        </div>
      </div>
    );
  }
}
Game.propTypes = {
  nextPlayer: React.PropTypes.func.isRequired,
  player: React.PropTypes.string.isRequired,
};

export default Game;

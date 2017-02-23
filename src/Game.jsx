import React, { Component } from 'react';
import Board from './Board';
import { getDefaultPieces } from './util';
import { pieceMoves } from './moves';

class Game extends Component {
  constructor() {
    super();
    const squares = getDefaultPieces();
    this.state = {
      squares,
      whiteIsNext: true,
      selected: null,
    };
  }
  cleanClasses() {
    const squares = this.state.squares.slice();
    for(let s = 0; s < 64; s++) {
      if (squares[s].classes) {
        squares[s].classes = null;
      }
    }
    this.setState({ squares });
  }
  handleClick(i) {
    const player = this.state.player;
    // TODO : jouer déplacement, si player = player, selected = selected

    // TODO : nextPlayer() si on joue un coup
    this.props.nextPlayer();
    this.cleanClasses();

    const squares = this.state.squares.slice();
    if (!squares[i].piece) {
      return null;
    }

    const selected = i;

    if (squares[i].player === player) {
      const moves = pieceMoves(i, squares);

      // moves
      for (let m = 0; m < moves.moves.length; m += 1) {
        const move = moves.moves[m];
        if (!squares[move].classes) {
          squares[move].classes = [];
        }
        squares[move].classes.push('can-move');
      }

      // eats
      for (let e = 0; e < moves.eats.length; e += 1) {
        const eat = moves.moves[e];
        if (!squares[eat].classes) {
          squares[eat].classes = [];
        }
        squares[eat].classes.push('can-eat');
      }

      this.setState({
        squares,
        selected,
      });
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
  nextPlayer: React.PropTypes.func,
  player: React.PropTypes.string.isRequired,
};
Game.defaultProps = {
  nextPlayer() {},
};

export default Game;

import React, { Component } from 'react';
import Board from './Board';
import { getDefaultPieces } from './util';
import { pieceMoves, move } from './moves';

class Game extends Component {
  constructor() {
    super();
    const squares = getDefaultPieces();
    this.state = {
      squares,
      nextPlayer: 'white',
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
    const squares = this.state.squares.slice();
    const nextPlayer = this.state.nextPlayer;
    const selected = this.state.selected;
    this.cleanClasses();

    // TODO : jouer déplacement, selected === une piece du nextPlayer, et que squares[i] est un move / eat autorisé
    if(selected && squares[selected] && squares[selected].player === nextPlayer) {
      const moves = pieceMoves(selected, squares);
      if (moves.moves.includes(i) || moves.eats.includes(i)) {
        // jouer coup
        const newSquares = move(squares, selected, i);
        const newNextPlayer = nextPlayer === 'white' ? 'black' : 'white';
        this.cleanClasses();
        this.setState({
          nextPlayer: newNextPlayer,
          squares: newSquares,
        });
        this.props.nextPlayer();
      }
    }

    if (!squares[i].piece) {
      return null;
    }

    if (squares[i].player === nextPlayer) {
      if (!squares[i].classes) squares[i].classes = [];
      squares[i].classes.push('selected-chessman');

      const moves = pieceMoves(i, squares);
      // moves
      for (let m = 0; m < moves.moves.length; m += 1) {
        const move = moves.moves[m];
        if (!squares[move].classes) squares[move].classes = [];
        squares[move].classes.push('can-move');
      }

      // eats
      for (let e = 0; e < moves.eats.length; e += 1) {
        const eat = moves.eats[e];
        if (!squares[eat].classes) squares[eat].classes = [];
        squares[eat].classes.push('can-eat');
      }

      this.setState({
        squares,
        selected: i,
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

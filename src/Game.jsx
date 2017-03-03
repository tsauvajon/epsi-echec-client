import React, { Component } from 'react';
import Board from './Board';
import { getDefaultPieces, PieceEnum } from './util';
import { pieceMoves, move } from './moves';
import { assessCheck, checkCheck, findTheKing, checkMate } from './checks';

class Game extends Component {
  constructor() {
    super();
    const squares = getDefaultPieces();
    this.state = {
      squares,
      nextPlayer: 'white',
      selected: null,
      whiteCanCastle: true,
      blackCanCastle: true,
    };
  }
  // vide le .classes de tous les squares
  cleanClasses() {
    const squares = this.state.squares.slice().map(s => {
      const sq = s;
      sq.classes = undefined;
      return sq;
    });
    this.setState({ squares });
  }
  handleClick(i) {
    const squares = this.state.squares.slice();
    const nextPlayer = this.state.nextPlayer;
    const selected = this.state.selected;
    this.cleanClasses();

    // jouer déplacement, si selected === une piece du nextPlayer, et que squares[i] est un move / eat autorisé
    if((selected || selected === 0) && squares[selected].player && squares[selected].player === nextPlayer) {
      const moves = pieceMoves(selected, squares);
      if (moves.moves.includes(i) || moves.eats.includes(i)) {
        // vérifier que le joueur ne se mettrait pas en echec
        const checkFrom = assessCheck(squares, selected, i);
        if (checkFrom.length > 0){
          for (let c = 0; c < checkFrom.length; c += 1) {
            const causesCheck = checkFrom[c];
            if (!squares[causesCheck].classes) {
              squares[causesCheck].classes = [];
            }
            squares[causesCheck].classes.push('causes-check');
          }
        } else {
          // jouer coup
          const newSquares = move(squares, selected, i);
          // maintenant que le coup est joué, on vérifie si un pion se transforme en dame :
          if ((i < 8 && nextPlayer === 'white') || (i > 55 && nextPlayer === 'black')) {
            if (newSquares[i].piece === PieceEnum.PAWN) {
              newSquares[i].piece = PieceEnum.QUEEN;
            }
          }

          const newNextPlayer = nextPlayer === 'white' ? 'black' : 'white';
          this.cleanClasses();
          this.props.nextPlayer();

          // puis si le prochain joueur est en échec
          const newCheck = checkCheck(newSquares, newNextPlayer);
          if(newCheck.length === 0) {
            this.setState({
              nextPlayer: newNextPlayer,
              squares: newSquares,
            });
          } else {
            // indique l'état d'échec
            this.props.check();
            // trouver le roi du joueur
            const king = findTheKing(newSquares, newNextPlayer);
            // souligner en rouge la / les pièces qui causent l'échec + le roi
            if (!newSquares[king].classes) {
              newSquares[king].classes = [];
            }
            newSquares[king].classes.push('is-check')
            for (let c = 0; c < newCheck.length; c += 1) {
              const causesCheck = newCheck[c];
              if (!newSquares[causesCheck].classes) {
                newSquares[causesCheck].classes = [];
              }
              newSquares[causesCheck].classes.push('causes-check');

              if (checkMate(newSquares, newNextPlayer)) {
                // displays winner's color + checkmate animation
                this.props.checkMate(nextPlayer);
              }
              this.setState({
                nextPlayer: newNextPlayer,
                squares: newSquares,
              });
            }
          }
        }
      }
    }

    if (!squares[i].piece) {
      return null;
    }

    // sinon, si l'utilisateur a cliqué sur une de ses pièces, la selectionne
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

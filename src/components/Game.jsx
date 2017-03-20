import React, { Component } from 'react';
import Board from './Board';
import { getDefaultPieces, PieceEnum } from '../utility/util';
import { pieceMoves, move } from '../moves/index';
import { assessCheck, checkCheck, findTheKing, checkMate } from '../moves/checks';

class Game extends Component {
  constructor() {
    super();
    const squares = getDefaultPieces();
    this.state = {
      squares,
      nextPlayer: 'white',
      selected: null,
      castling: [56, 63, 0, 7],
    };
  }
  // vide le .classes de tous les squares
  cleanClasses() {
    const squares = this.state.squares.map(
      (s) => {
        const t = s;
        t.classes = undefined;
        return s;
      },
    );
    this.setState({ squares });
  }
  // regarde si le roque est toujours possible;
  removeCastling(i) {
    // si le tableau est déjà vide pas la peine de vérifier
    let castling = this.state.castling.slice();
    if (!castling.length) return undefined;
    // black king bouge ou est échec : on supprime ses 2 possiblités de roque
    if (i === 4) {
      // on vide 0 et 7 du tableau
      castling = castling
        .filter(item => item !== 0)
        .filter(item => item !== 7);
    } else if (i === 60) {
      // white king : on supprime ses 2 possiblités de roque
      castling = castling
        .filter(item => item !== 56)
        .filter(item => item !== 63);
    } else {
      castling = castling.filter(item => item !== i);
    }
    this.setState({ castling });
    return castling;
  }
  handleClick(i) {
    const squares = this.state.squares.slice();
    const nextPlayer = this.state.nextPlayer;
    const selected = this.state.selected;
    this.cleanClasses();

    // jouer déplacement, si selected === une piece du nextPlayer,
    // et que squares[i] est un move / eat autorisé
    if ((selected || selected === 0)
      && squares[selected].player
      && squares[selected].player === nextPlayer) {
      const moves = pieceMoves(selected, squares);
      if (moves.moves.includes(i) || moves.eats.includes(i)) {
        // vérifier que le joueur ne se mettrait pas en echec
        const checkFrom = assessCheck(squares, selected, i);
        if (checkFrom.length > 0) {
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
          // retirer les éventuels roques possibles si une tour / un roi a été bougé
          this.removeCastling(selected);
          // maintenant que le coup est joué, on vérifie si un pion se transforme en dame :
          if ((i < 8 && nextPlayer === 'white') || (i > 55 && nextPlayer === 'black')) {
            if (newSquares[i].piece === PieceEnum.PAWN) {
              newSquares[i].piece = PieceEnum.QUEEN;
            }
          }

          const newNextPlayer = nextPlayer === 'white' ? 'black' : 'white';
          this.cleanClasses();
          this.props.nextPlayer();

          // On vérifie si le prochain joueur est en échec
          const newCheck = checkCheck(newSquares, newNextPlayer);
          // pas échec, terminé
          if (newCheck.length === 0) {
            // échec = roque interdit
            this.setState({
              nextPlayer: newNextPlayer,
              squares: newSquares,
            });
          } else {
            // indique l'état d'échec
            this.props.check();
            // interdit de roquer
            this.removeCastling(newNextPlayer === 'white' ? 60 : 4);
            // trouver le roi du joueur
            const king = findTheKing(newSquares, newNextPlayer);
            // souligner en rouge la / les pièces qui causent l'échec + le roi
            if (!newSquares[king].classes) {
              newSquares[king].classes = [];
            }
            newSquares[king].classes.push('is-check');
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
              // on en profite pour retirer le roque,
              this.setState({
                nextPlayer: newNextPlayer,
                squares: newSquares,
              });
            }
          }
        }
      }
    }

    // si l'utilisateur essaie de selectionner une case vide
    if (!squares[i].piece) {
      return undefined;
    }

    // sinon, si l'utilisateur a cliqué sur une de ses pièces, la selectionne
    if (squares[i].player === nextPlayer) {
      if (!squares[i].classes) squares[i].classes = [];
      squares[i].classes.push('selected-chessman');

      const moves = pieceMoves(i, squares);
      // moves : push la classe css pour les squares disponibles pour déplacement
      for (let m = 0; m < moves.moves.length; m += 1) {
        const currentMove = moves.moves[m];
        if (!squares[currentMove].classes) squares[currentMove].classes = [];
        squares[currentMove].classes.push('can-move');
      }

      // eats : push la classe css pour les squares mangeables
      for (let e = 0; e < moves.eats.length; e += 1) {
        const eat = moves.eats[e];
        if (!squares[eat].classes) squares[eat].classes = [];
        squares[eat].classes.push('can-eat');
      }

      // on update les squares (pour update les classes) et la case selected
      this.setState({
        squares,
        selected: i,
      });
    }

    return undefined;
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
  check: React.PropTypes.func,
  checkMate: React.PropTypes.func,
};
Game.defaultProps = {
  nextPlayer() {},
  check() {},
  checkMate() {},
};

export default Game;

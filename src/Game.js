import React, { Component } from 'react';
import Board from './Board';

const PieceEnum = Object.freeze({
  KING: 1,
  QUEEN: 2,
  ROOK: 3,
  BISHOP: 4,
  KNIGHT: 5,
  PAWN: 6,
});

function getDefaultPieces() {

  const squares = Array(64).fill(null);

  squares[56] = { piece: PieceEnum.ROOK, player: 1 };
  squares[63] = { piece: PieceEnum.ROOK, player: 1 };
  squares[57] = { piece: PieceEnum.KNIGHT, player: 1 };
  squares[62] = { piece: PieceEnum.KNIGHT, player: 1 };
  squares[58] = { piece: PieceEnum.BISHOP, player: 1 };
  squares[61] = { piece: PieceEnum.BISHOP, player: 1 };
  squares[59] = { piece: PieceEnum.QUEEN, player: 1 };
  squares[60] = { piece: PieceEnum.KING, player: 1 };
  for (let i = 48; i<56; i++){
    squares[i] = { piece: PieceEnum.PAWN, player: 1 };
  }

  squares[0] = { piece: PieceEnum.ROOK, player: 2 };
  squares[7] = { piece: PieceEnum.ROOK, player: 2 };
  squares[1] = { piece: PieceEnum.KNIGHT, player: 2 };
  squares[6] = { piece: PieceEnum.KNIGHT, player: 2 };
  squares[2] = { piece: PieceEnum.BISHOP, player: 2 };
  squares[5] = { piece: PieceEnum.BISHOP, player: 2 };
  squares[3] = { piece: PieceEnum.QUEEN, player: 2 };
  squares[4] = { piece: PieceEnum.KING, player: 2 };
  for (let i = 8; i<16; i++){
    squares[i] = { piece: PieceEnum.PAWN, player: 2 };
  }

  return squares;
}

class Game extends Component{
  constructor() {
    super();
    const squares = getDefaultPieces();

    this.state = {
      squares: squares,
      whiteIsNext: true,
    };
  }
  render() {
    return (
      <div className="game" key="game">
        <div className="game-board" key="game-board">
          <Board squares={ this.state.squares }
            onClick={ (i) => this.handleClick(i) }
          />
        </div>
      </div>
    )
  }
}

export default Game;

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

  squares[56] = { piece: PieceEnum.ROOK, player: "white" };
  squares[63] = { piece: PieceEnum.ROOK, player: "white" };
  squares[57] = { piece: PieceEnum.KNIGHT, player: "white" };
  squares[62] = { piece: PieceEnum.KNIGHT, player: "white" };
  squares[58] = { piece: PieceEnum.BISHOP, player: "white" };
  squares[61] = { piece: PieceEnum.BISHOP, player: "white" };
  squares[59] = { piece: PieceEnum.QUEEN, player: "white" };
  squares[60] = { piece: PieceEnum.KING, player: "white" };
  for (let i = 48; i<56; i++){
    squares[i] = { piece: PieceEnum.PAWN, player: "white" };
  }

  squares[0] = { piece: PieceEnum.ROOK, player: "black" };
  squares[7] = { piece: PieceEnum.ROOK, player: "black" };
  squares[1] = { piece: PieceEnum.KNIGHT, player: "black" };
  squares[6] = { piece: PieceEnum.KNIGHT, player: "black" };
  squares[2] = { piece: PieceEnum.BISHOP, player: "black" };
  squares[5] = { piece: PieceEnum.BISHOP, player: "black" };
  squares[3] = { piece: PieceEnum.QUEEN, player: "black" };
  squares[4] = { piece: PieceEnum.KING, player: "black" };
  for (let i = 8; i<16; i++){
    squares[i] = { piece: PieceEnum.PAWN, player: "black" };
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
      player: "white",
    };
  }
  render() {
    return (
      <div className="game" key="game">
        <div className="game-board" key="game-board">
          <Board squares={ this.state.squares } player={ this.state.player }
            onClick={ (i) => this.handleClick(i) }
          />
        </div>
      </div>
    )
  }
}

export default Game;

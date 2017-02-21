import React from 'react';
import { PieceEnum } from './util';
// images
import bishopBlack from './pieces/bishop-black.svg';
import bishopWhite from './pieces/bishop-white.svg';
import kingBlack from './pieces/king-black.svg';
import kingWhite from './pieces/king-white.svg';
import knightBlack from './pieces/knight-black.svg';
import knightWhite from './pieces/knight-white.svg';
import pawnBlack from './pieces/pawn-black.svg';
import pawnWhite from './pieces/pawn-white.svg';
import queenBlack from './pieces/queen-black.svg';
import queenWhite from './pieces/queen-white.svg';
import rookBlack from './pieces/rook-black.svg';
import rookWhite from './pieces/rook-white.svg';

function valueToImg(value) {
  if (!value) {
    return null;
  }
  let piece;
  switch (value.piece) {
    case PieceEnum.KING:
      piece = value.player === 'white' ? kingWhite : kingBlack;
      break;
    case PieceEnum.QUEEN:
      piece = value.player === 'white' ? queenWhite : queenBlack;
      break;
    case PieceEnum.ROOK:
      piece = value.player === 'white' ? rookWhite : rookBlack;
      break;
    case PieceEnum.BISHOP:
      piece = value.player === 'white' ? bishopWhite : bishopBlack;
      break;
    case PieceEnum.KNIGHT:
      piece = value.player === 'white' ? knightWhite : knightBlack;
      break;
    case PieceEnum.PAWN:
      piece = value.player === 'white' ? pawnWhite : pawnBlack;
      break;
    default:
      return null;
  }
  const classes = 'chessman';
  if (value.classes) {
    classes.concat(` ${value.classes.join(' ')}`);
  }
  return (
    <img src={piece} className={classes} alt="" />
  );
}

function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {valueToImg(props.value)}
    </button>
  );
}

Square.propTypes = {
  onClick: React.PropTypes.func,
};

export default Square;

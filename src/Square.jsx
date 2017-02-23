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

function valueToImg(piece, player) {
  if (!piece || !player) return null;
  let img;
  switch (piece) {
    case PieceEnum.KING:
      img = player === 'white' ? kingWhite : kingBlack;
      break;
    case PieceEnum.QUEEN:
      img = player === 'white' ? queenWhite : queenBlack;
      break;
    case PieceEnum.ROOK:
      img = player === 'white' ? rookWhite : rookBlack;
      break;
    case PieceEnum.BISHOP:
      img = player === 'white' ? bishopWhite : bishopBlack;
      break;
    case PieceEnum.KNIGHT:
      img = player === 'white' ? knightWhite : knightBlack;
      break;
    case PieceEnum.PAWN:
      img = player === 'white' ? pawnWhite : pawnBlack;
      break;
    default:
      img = null;
  }
  if (img) {
    return (
      <img src={img} className="chessman" alt={`${player} ${piece}`} />
    );
  }
  return null;
}

function getClassNames(classes) {
  let classNames = 'square';
  if (classes) {
    for (let c = 0; c < classes.length; c += 1) {
      classNames = classNames.concat(' ', classes[c]);
    }
  }
  return classNames;
}

function Square(props) {
  return (
    <button className={getClassNames(props.classes)} onClick={() => props.onClick()}>
      {valueToImg(props.piece, props.player)}
    </button>
  );
}

Square.propTypes = {
  classes: React.PropTypes.arrayOf(React.PropTypes.string),
  piece: React.PropTypes.string,
  player: React.PropTypes.string,
  onClick: React.PropTypes.func,
};

export default Square;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Square from './Square';
import { getX, getY } from '../utility/util';

const getColor = (i) => {
  // trie les cases claires / foncées
  if ((getX(i) % 2) + (getY(i) % 2) === 1) {
    return 'alt-square';
  }
  return 'regular-square';
};

class Board extends Component {
  renderSquare(i) {
    return (
      <Square
        key={`square ${i}`}
        color={getColor(i)}
        piece={this.props.squares[i].piece}
        player={this.props.squares[i].player}
        classes={this.props.squares[i].classes}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
  renderRow(r) {
    const row = [];
    // switches the board for white / black
    let start = 0;
    let increase = 1;
    if (this.props.player === 'black') {
      start = 7;
      increase = -1;
    }
    for (let i = start; i < 8 && i > -1; i += increase) {
      row.push(this.renderSquare((r * 8) + i));
    }
    return (
      <div key={`row ${r}`}>
        {row}
      </div>
    );
  }
  renderRows() {
    const rows = [];
    let start = 0;
    let increase = 1;
    if (this.props.player === 'black') {
      start = 7;
      increase = -1;
    }
    for (let i = start; i < 8 && i > -1; i += increase) {
      rows.push(this.renderRow(i));
    }
    return (
      <div>
        {rows}
      </div>
    );
  }
  render() {
    return (
      <div>
        {this.renderRows()}
      </div>
    );
  }
}
Board.propTypes = {
  squares: PropTypes.arrayOf(PropTypes.object).isRequired,
  player: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Board;

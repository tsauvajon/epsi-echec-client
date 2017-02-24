import React, { Component } from 'react';
import Square from './Square';
import { getX, getY } from './util';

class Board extends Component {
  getColor(i) {
    if ((getX(i) % 2) + (getY(i) % 2) === 1) {
      return 'alt-square';
    }
    return 'regular-square';
  }
  renderSquare(i) {
    return (
      <Square
        key={`square ${i}`}
        color={this.getColor(i)}
        piece={this.props.squares[i].piece}
        player={this.props.squares[i].player}
        classes={this.props.squares[i].classes}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
  renderRow(r) {
    const row = [];
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
  squares: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  player: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
};

export default Board;

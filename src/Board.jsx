import React, { Component } from 'react';
import Square from './Square';

class Board extends Component {
  renderSquare(i) {
    return <Square
      key={'square' + i}
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
    />;
  }
  renderRow(r) {
    const row = [];
    let start = 0;
    let increase = 1;
    if (this.props.player === "black") {
      start = 7;
      increase = -1;
    }
    for (let i = start; i < 8 && i > -1; i += increase) {
      row.push(this.renderSquare(r*8 + i));
    }
    return (
      <div key={ 'row' + r }>
        { row }
      </div>
    );
  }
  renderRows() {
    const rows = [];
    let start = 0;
    let increase = 1;
    if (this.props.player === "black") {
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

export default Board;

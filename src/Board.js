import React, { Component } from 'react';
import Square from './Square';

class Board extends Component {
  renderSquare(i) {
    return <Square key={ 'square' + i } value={ this.props.squares[i] }
      onClick={() => this.props.onClick(i) } />;
  }
  renderRow(r) {
    const row = [];
    let start = 0;
    let increase = 1;
    if (this.props.player === "black"){
      start = 7;
      increase = -1;
    }
    for (let i = start; i < 8 && i > -1; i += increase) {
      console.log("i : " + i + " - r : " + r);
      row.push(this.renderSquare(r*8 + i));
    }
    return (
      <div key={ 'row' + r }>
        { row }
      </div>
    );
  }
  renderRows() {
    // 0 1 2 3 4 5 6 7
    // 7 6 5 4 3 2 1 0
    // start = 0, i < 8
    // start = 7, i > -1
    const rows = [];
    let start = 0;
    let increase = 1;
    if (this.props.player === "black"){
      start = 7;
      increase = -1;
    }
    for (let i = start; i < 8 && i > -1; i += increase) {
      rows.push(this.renderRow(i));
    }
    return (
      <div>
        { rows }
      </div>
    );
  }
  render() {
    return (
      <div>
        { this.renderRows() }
      </div>
    );
  }
}

export default Board;

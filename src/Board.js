import React, { Component } from 'react';
import Square from './Square';

class Board extends Component {
  renderSquare(i) {
    return <Square key={ 'square' + i } value={ this.props.squares[i] }
      onClick={() => this.props.onClick(i) } />;
  }
  renderRow(r) {
    const row = [];
    for (let i = 0; i < 8; i++) {
      row.push(this.renderSquare(r*8 + i));
    }
    return (
      <div key={ 'row' + r }>
        { row }|
      </div>
    );
  }
  renderRows() {
    const rows = [];
    for (let i = 0; i < 8; i++) {
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

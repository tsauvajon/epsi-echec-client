import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Echecs à l'EPSI</h2>
        </div>
        <p className="App-intro">

        </p>
      </div>
    );
  }
}

var PieceEnum = Object.freeze({
  KING: 1,
  QUEEN: 2,
  ROOK: 3,
  BISHOP: 4,
  KNIGHT: 5,
  PAWN: 6,
});

export default App;

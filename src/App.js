import React, { Component } from 'react';
import Game from './Game';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo App-logo-loading" alt="logo" />
          <h2>Echecs à l'EPSI</h2>
        </div>
        <p className="App-intro">
          Jeu d'échecs en WebSocket
        </p>
        <div>
          <Game />
        </div>
      </div>
    );
  }
}

export default App;

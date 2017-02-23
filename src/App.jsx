import React, { Component } from 'react';
import Game from './Game';

import black from './pieces/king-black.svg';
import white from './pieces/king-white.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      logo: white,
      check: false,
    };
  }
  nextPlayer() {
    const player = (this.state.logo === black) ? 'white' : 'black';
    const logo = (player === 'white') ? white : black;
    this.setState({
      logo,
      check: false,
    });
  }
  check() {
    this.setState({
      check: true,
    })
  }
  checkMate(winner) {
    const logo = (winner === 'white') ? white : black;
    this.setState({
      logo,
      checkMate: true,
    });
  }
  render() {
    const className = this.state.checkMate ?
    'App-logo-check-mate'
    : this.state.check
    ? 'App-logo-check'
    : 'App-logo-default';
    return (
      <div className="App">
        <div className="App-header">
          <img src={this.state.logo} className={`App-logo ${className}`} alt="logo" />
          <h2>Echecs à l&#39;EPSI</h2>
        </div>
        <p className="App-intro">
          Jeu d&#39;échecs en WebSocket
        </p>
        <Game
          player="white"
          nextPlayer={() => this.nextPlayer()}
          check={() => this.check()}
          checkMate={winner => this.checkMate(winner)}
        />
      </div>
    );
  }
}

export default App;

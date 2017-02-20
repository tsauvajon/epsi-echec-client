import React, { Component } from 'react';
import Game from './Game';

import black from './pieces/king-black.svg';
import white from './pieces/king-white.svg';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      logo: black,
    };
  }
  nextPlayer(){
    const player = (this.state.logo === black) ? "white" : "black";
    const logo = (player === "white") ? white : black;
    this.setState({
      logo: logo,
    });
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={ this.state.logo } className="App-logo App-logo-loading" alt="logo" />
          <h2>Echecs à l'EPSI</h2>
        </div>
        <p className="App-intro">
          Jeu d'échecs en WebSocket
        </p>
        <Game player="white" nextPlayer={ () => this.nextPlayer() } />
      </div>
    );
  }
}

export default App;

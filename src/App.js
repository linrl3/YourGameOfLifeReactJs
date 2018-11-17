import React, { Component } from 'react';
import './App.css';
import Game from './Game.js';
const titleStyle={textAlign:'center'}
class App extends Component {
  render() {
    return (
      <div>
        <h1 style={titleStyle}> 
          Welcome to your game of life. 
        </h1>
        <Game />
      </div>
    );
  }
}

export default App;

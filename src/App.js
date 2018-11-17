import React, { Component } from 'react';
import './App.css';
import Game from './Game.js';
const titleStyle={textAlign:'center',fontFamily:"Comic Sans MS"}
const paragraphStyle={textAlign:'left',fontFamily:"Comic Sans MS"}
class App extends Component {
  render() {
    return (
      <div>
        <h1 style={titleStyle}> 
          Welcome to your game of life 
        </h1>
        <p style={paragraphStyle}>
                Rules From Wiki:<br/>
                1.Any live cell with fewer than two live neighbors dies, as if by underpopulation.<br/>
                2.Any live cell with two or three live neighbors lives on to the next generation.<br/>
                3.Any live cell with more than three live neighbors dies, as if by overpopulation.<br/>
                4.Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.<br/>
                <br/>
                How to Play:<br/>
                Click on the borad to create your CELLS. You can also select a preset pattern and see what to go.
        </p>
        <Game />
      </div>
    );
  }
}

export default App;

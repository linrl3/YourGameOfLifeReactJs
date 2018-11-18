import React, { Component } from 'react';
import './App.css';
import Game from './Game.js';
const titleStyle={textAlign:'center',fontFamily:"Comic Sans MS"}
const paragraphStyle={textAlign:'left',fontFamily:"Comic Sans MS",position:"relative",left:'20%'}
class App extends Component {
  render() {
    return (
      <div style={{backgroundColor:"rgb(204,204,214)"}}>
        <h1 style={titleStyle}> 
          Welcome to your Game of Life<br/>
        </h1>
        <h4 style={titleStyle}>
          The Game of Life is a cellular automaton devised by the British mathematician John Horton Conway.<br/>
        </h4>
        <p style={paragraphStyle}>
                Rules :<br/>
                The game board is a two-dimensional grid of square cells, each of which is alive or dead.<br/>
                Every cell interacts with its eight neighbours. At each step in time, the following transitions occur:<br/>
                1.Any live cell with fewer than two live neighbors dies, as if by underpopulation.<br/>
                2.Any live cell with two or three live neighbors lives on to the next generation.<br/>
                3.Any live cell with more than three live neighbors dies, as if by overpopulation.<br/>
                4.Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.<br/>
                <br/>
                How to Play:<br/>
                Click on the borad to create your CELLS. Then run the game. You can also select a preset pattern before you start.
        </p>
        <Game />
      </div>
    );
  }
}

export default App;

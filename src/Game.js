import React from 'react'
import "./Game.css"
const CELL_SIZE= 10;
const WIDTH=800
const HEIGHT=600
const boardStyle={width:WIDTH, height:HEIGHT,backgroundSize:`${CELL_SIZE}px ${CELL_SIZE}px`}
const glider=[{x: 1, y: 0},{x: 2, y: 1},{x: 0, y: 2},{x: 1, y: 2},{x: 2, y: 2}]
const exploder=[{x: 0, y: 0},{x: 2, y: 0},{x: 4, y: 0},{x: 0, y: 1},{x: 4, y: 1},{x: 0, y: 2},{x: 4, y: 2},{x: 0, y: 3},{x: 4, y: 3},{x: 0, y: 4},{x: 2, y: 4},{x: 4, y: 4}]
const pattern={"gliderCells":glider,"exploderCells":exploder}


class Cell extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		const x=this.props.pos.x
		const y=this.props.pos.y
		return(
	      <div className="Cell" style={{
	        left: `${CELL_SIZE * x + 1}px`,
	        top: `${CELL_SIZE * y + 1}px`,
	        width: `${CELL_SIZE - 1}px`,
	        height: `${CELL_SIZE - 1}px`,
	      }} />
			)
	}
}
class Game extends React.Component{
	constructor(props){
		super(props)
		this.rows=HEIGHT/CELL_SIZE
		this.cols=WIDTH/CELL_SIZE
		this.board=this.makeEmptyBoard()
		this.timeout=null
		//this.pattern=[]
		this.state={
			cells:[],
			isRunning:false,
			interval:100
		}
		this.handleClick=this.handleClick.bind(this)
		this.startGame=this.startGame.bind(this)
		this.stopGame=this.stopGame.bind(this)
		this.handleInterval=this.handleInterval.bind(this)
		this.pauseGame=this.pauseGame.bind(this)
		this.makeRandomCells=this.makeRandomCells.bind(this)
		this.makePattern=this.makePattern.bind(this)

	}
	startGame(e){
		this.setState({isRunning:true})
		this.runInterations()
	}
	stopGame(e){
		this.setState({isRunning:false})
		console.log("Game stopped!")
		if(this.timeout){
			window.clearTimeout(this.timeout)
			this.timeout=null
		}
		let newBoard=this.makeEmptyBoard()
		this.board=newBoard
		this.setState({cells:[]})	
	}
	pauseGame(e){
		this.setState({isRunning:false})
		if(this.timeout){
			window.clearTimeout(this.timeout)
			this.timeout=null
		}
		this.setState({cells:this.makeCells()})
	}
	handleInterval(e){
		this.setState({interval:e.target.value})
	}
    calculateNeighbors(board, x, y) {
        let neighbors = 0;
        const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
        for (let i = 0; i < dirs.length; i++) {
            const dir = dirs[i];
            let y1 = y + dir[0];
            let x1 = x + dir[1];

            if (x1 >= 0 && x1 < this.cols && y1 >= 0 && y1 < this.rows && board[y1][x1]) {
                neighbors++;
            }
        }

        return neighbors;
    }
	//calculate offset
	getElementOffset() {
	    const rect = this.boardRef.getBoundingClientRect();
	    const doc = document.documentElement;
	    console.log("---------")
	    console.log("rect.left",rect.left)
	    console.log("rect.top",rect.top)
	    console.log("window.pageXOffset",window.pageXOffset)
	    console.log("window.pageYOffset",window.pageYOffset)
	    console.log("doc.clientLeft",doc.clientLeft)
	    console.log("doc.clientTop",doc.clientTop)
	    return {
	      //consider scrolling
	      //x: (rect.left - window.pageXOffset) - doc.clientLeft,
	      //y: (rect.top - window.pageYOffset) - doc.clientTop,
	      x: (rect.left ) - doc.clientLeft,
	      y: (rect.top ) - doc.clientTop,
	    };
	  }
	runInterations(){
		console.log("Game Running!")
		console.log(this.state.cells)
		window.localStorage.setItem("key","value");
		let newBoard=this.makeEmptyBoard()
		for (let y = 0; y < this.rows; y++) {
		  for (let x = 0; x < this.cols; x++) {
		    let neighbors = this.calculateNeighbors(this.board, x, y);
		    if (this.board[y][x]) {
		      if (neighbors === 2 || neighbors === 3) {
		        newBoard[y][x] = true;
		      } else {
		        newBoard[y][x] = false;
		      }
		    } else {
		      if (!this.board[y][x] && neighbors === 3) {
		        newBoard[y][x] = true;
		      }
		    }
		  }
		}
		let newCells=this.makeCells()
		this.board=newBoard
		this.setState({cells:newCells})
		this.timeout=window.setTimeout(()=>this.runInterations(), this.state.interval)
	}
	handleClick = (event) => {
	    const elemOffset = this.getElementOffset();
	    //event.clientX is the position of the mouse click, minus offset, we can get the relative position in the graph
	    console.log("event.clientX",event.clientX)
	    console.log("event.clientY",event.clientY)
	    const offsetX = event.clientX - elemOffset.x;
	    const offsetY = event.clientY - elemOffset.y;
	    const x = Math.floor(offsetX / CELL_SIZE);
	    const y = Math.floor(offsetY / CELL_SIZE);
	    if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) {
	      this.board[y][x] = !this.board[y][x];
	    }
	    this.setState({ cells: this.makeCells() });
	  }
	makeEmptyBoard(){
		let board=[]
		for(let y=0;y<this.rows;y++){
			board[y]=[]
			for(let x=0;x<this.cols;x++) board[y][x]=false;
		}
		return board
	}
	makeCells(){
		let cells=[]
		for(let y=0;y<this.rows;y++){
			for(let x=0;x<this.cols;x++){
				if(this.board[y][x]) cells.push({x,y})
			}
		}
		return cells;
	}
	makePattern(e){
		if(e.target.value===" ") {
			this.stopGame()
			return 0
		}
		if(e.target.value==="randomCells") {
			this.makeRandomCells()
			return 0
		}
		let p=pattern[e.target.value]
		let newBoard=this.makeEmptyBoard()
		this.board=newBoard
		let patternCells=[]
		for (var i = 0; i < p.length; i++) {
			this.board[this.rows/2+p[i].y][this.cols/2+p[i].x]=true
		}
		for(let y=0;y<this.rows;y++){
			for(let x=0;x<this.cols;x++){
				if(this.board[y][x]) patternCells.push({x,y});
			}
		}
		this.setState({cells:patternCells})
	}
	makeRandomCells(){
		let newBoard=this.makeEmptyBoard()
		this.board=newBoard
		let randomCells=[]
		for(let y=0;y<this.rows;y++){
			for(let x=0;x<this.cols;x++){
				if(Math.random()>=0.5) {
					this.board[y][x]=true
					randomCells.push({x,y})
				}
				else this.board[y][x]=false
			}
		}
		this.setState({cells:randomCells})
	}

	render(){
		const cells=this.state.cells
		const cnt=cells.length
		//console.log(cells)
		return(
			//note1:here we should put the render of the board and cells into the same <div>, 
			//if not, cell will be rendered to another box next to the board box
			//note2: remember add {} when you type a js value into jsx
			<div>
				<div className="Board"
					style={boardStyle} 
					onClick={this.handleClick}
					ref={(n)=>{this.boardRef=n;}}>
		        {cells.map(cell => (
            		<Cell pos={cell}
                	key={`${cell.x},${cell.y}`}/>
          		))}
          		</div>
          		<div className='Controls' align='center'>
          			<button className='button' value={1000} onClick={this.handleInterval}> Slow</button>
          			<button className='button' value={100} onClick={this.handleInterval}> Medium</button>
          			<button className='button' value={10} onClick={this.handleInterval}> Fast</button>
          			{	!this.state.isRunning?
          				<button className='button' onClick={this.startGame}> Run</button>:
          				<button className='button' onClick={this.pauseGame}> Pause</button>
          				
          			}
          			<button className='button' onClick={this.stopGame}> Stop&Reset</button>
          			{!this.state.isRunning?
          			<select onChange={this.makePattern}>
          				<option value=" ">Please select a pattern</option>
          				<option value="gliderCells">gliderCells</option>
          				<option value="exploderCells">exploderCells</option>
       					<option value="randomCells">randomCells</option>
          			</select>:
          			<h1></h1>
          			}

          		</div>
          		<div className='analysis' align='center'>
          			We have {cnt} cells now.
          		</div>
          	</div>
			)
	}
}

export default Game;
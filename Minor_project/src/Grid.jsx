import React from 'react'
import { Component } from 'react'
import Node from './Node.jsx'
import './grid.css'
import {getAllNodes, getNodesInShortestPathOrder} from './Algorithms/AlgoTools'
import {dijkstra} from './Algorithms/Dijkstras';
import {aStar} from './Algorithms/Astar';
import {generateWall1,generateWall2,generateWall3} from './obstacles/RandomWalls'
import {createMaze} from './obstacles/Maze'
import {unweightedSearchAlgorithm} from './Algorithms/BFS';
import {dfs} from './Algorithms/DFS';

export default class Grid extends Component
{
  constructor() 
    {
        super();
        this.state = {
          grid: [],
          mouseIsPressed: false,
          currentAlgorithm: [],
          performance:[],
        };
    } 
   
   
  componentDidMount() {
    const grid = getInitialGrid();
    getAllNodes(grid)
    this.setState({grid});
  }
    
    
  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true});
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid});
  }

  handleMouseUp() {
    this.setState({mouseIsPressed: false});
  }
  clearGrid(){ 
    const {grid}=this.state    
    for(var i=0;i<grid.length;i++){
      for(var j=0;j<grid[i].length;j++){
            
        grid[i][j].isVisited=false
        if((!grid[i][j].isStart)&&(!grid[i][j].isFinish)&&(!grid[i][j].isWall))
        document.getElementById(`node-${grid[i][j].row}-${grid[i][j].col}`).className =
        'node ';
      }
    }
  }
  recordPerofrmence(algo,time,numberOfVisited,lengthOfSHortestPath){
    const {performance}=this.state
    var tempPerformance = new Object();
    tempPerformance.algorithm=algo
    tempPerformance.time=time
    tempPerformance.shortestPathLength=lengthOfSHortestPath
    tempPerformance.numberOfVisitedNodes=numberOfVisited
    performance.push(tempPerformance)
    console.log(performance)
   
  }
 
  animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder) {
    
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 20 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if(!(visitedNodesInOrder[i].isStart||visitedNodesInOrder[i].isFinish))
        {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
        }
      }, 20 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) 
    {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        if(!(nodesInShortestPathOrder[i].isStart||nodesInShortestPathOrder[i].isFinish))
        {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
        } 
      }, 30 * i);
    }
    setTimeout(() => {
     this.clearGrid()
    }, 20 * 60);
    setTimeout(() => {
      this.startVisualization()
        }, 20 * 60);
    
  }

  visualizeDijkstra() {
   
    const {grid} = this.state;
    const startNode = grid[10][15];
    const finishNode = grid[10][35];
    var t0=performance.now()
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    var t1=performance.now()
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    console.log(nodesInShortestPathOrder)
    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
    this.recordPerofrmence('dijkstras',t1-t0,visitedNodesInOrder.length,nodesInShortestPathOrder.length)
  }
  visualizeAstar() {
   
    const {grid} = this.state;
    const startNode = grid[10][15];
    const finishNode = grid[10][35];
    var t0=performance.now()
    const visitedNodesInOrder = aStar(grid, startNode, finishNode);
    var t1=performance.now()
    console.log(visitedNodesInOrder)
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    console.log(nodesInShortestPathOrder)
    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
    this.recordPerofrmence('astar',t1-t0,visitedNodesInOrder.length,nodesInShortestPathOrder.length)
  }


  visualizeBfs() {
    
    const {grid} = this.state;
    const startNode = grid[10][15];
    const finishNode = grid[10][35];
    var t0=performance.now()
    const visitedNodesInOrder =  unweightedSearchAlgorithm(grid, startNode, finishNode,'bfs');
    var t1=performance.now()
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    console.log(nodesInShortestPathOrder)
    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);  
    this.recordPerofrmence('bfs',t1-t0,visitedNodesInOrder.length,nodesInShortestPathOrder.length)
  }

  visualizeDfs() {
    console.log('iwasclicked');
    const {grid} = this.state;
    const startNode = grid[10][15];
    const finishNode = grid[10][35];
    const visitedNodesInOrder =  dfs(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);  
  }

  selectionfunction(algo){
    const {currentAlgorithm}= this.state
    if(!currentAlgorithm.includes(algo)){
    currentAlgorithm.push(algo)
   }
    console.log(currentAlgorithm)
  }
  startVisualization(){
    const {currentAlgorithm}= this.state
    console.log(currentAlgorithm)
    let count=currentAlgorithm.length
    //for(var i=0;i<count;i++){
      var algo=currentAlgorithm.pop()
      if(currentAlgorithm.length==0){
        
      }
      
     
      if(algo=='dijsktras'){
        console.log('dijkstras')
        this.visualizeDijkstra()
        // setTimeout(() => {
        //   this.clearGrid()
        // },50 * 3);
        
      }
      if(algo=='astar'){
        console.log('astar')
        this.visualizeAstar()
        // setTimeout(() => {
        //   this.clearGrid()
        // },50 * 3);
      }
      if(algo=='bfs'){
        console.log('bfs')
        this.visualizeBfs()
        // setTimeout(() => {
        //   this.clearGrid()
        // },50 * 3);
      }

      if(algo=='dfs'){
        console.log('dfs')
        this.visualizeDfs()
        // setTimeout(() => {
        //   this.clearGrid()
        // },50 * 3);
      }

  }

  render() {
    
    const {grid, mouseIsPressed} = this.state;
    
    return (
      <>
      <div className="navBar">
        <a href="http://localhost:3000/">  <b> Pathfinding Visualizer </b></a>
        <a>  <button onClick={()=>this.startVisualization()}> Start Visualization </button></a>
        <a>  <button onClick={()=>this.clearGrid()}> Clear Grid </button></a>
        
        {/* <div className="dropDown"> 
          <a className="dropBtn"><b> Algorithms </b></a>
          <div className="dropdown-algo">
          <a onClick={() => this.visualizeDijkstra()}> <a> Dijkstra's algorithm</a> </a>
          <a onClick={() => this.visualizeAstar()}> <a> Astar algorithm</a> </a>
          <a onClick={() => this.visualizeBfs()}> <a> Bfs algorithm</a> </a>
          <a onClick={() => this.visualizeDfs()}> <a> Dfs algorithm</a> </a>
          </div> 
        </div> 
     */}

      

	<div className="dropDown"> 
          <label className="dropBtn"><b> Algorithms </b></label>
          
          
          <select className="dropdown-algo" id="dropdown-algo" multiple>
          <option onClick={()=>this.selectionfunction('dijsktras')} id='dijsktras'> Dijkstra's algorithm </option> 
          <option  onClick={()=>this.selectionfunction('astar')} id='astar'>  Astar algorithm  </option>
          <option  onClick={()=>this.selectionfunction('bfs') }id='bfs'>  Bfs algorithm  </option>
          <option  onClick={()=>this.selectionfunction('dfs')} id='dfs'>  Dfs algorithm   </option>
          </select> 
        </div>



      
        <div className="wall"> 
          <a className="dropWall"><b> Wall </b> </a>
          <div className="dropdown-wall">
            <a onClick=
                        {() => 
                              { const {grid} = this.state;
                                const newGrid=generateWall1(grid)
                                this.setState({grid: newGrid})
                              }
                        }
            >  <a> Level 1</a> </a> 
           <a onClick=
                        {() => 
                              {
                                const {grid} = this.state;
                                const newGrid=generateWall2(grid)
                                this.setState({grid: newGrid})
                              }
                        }
            >  <a> Level 2</a> </a> 
           <a onClick=
                        {() => 
                              {
                                const {grid} = this.state;
                                const newGrid=generateWall3(grid)
                                this.setState({grid: newGrid})
                              }
                        }
            >  <a> Level 3</a> </a> 
            <a onClick=
              {()=>
                  {const {grid} = this.state;
                  const newGrid=createMaze(grid)
                  this.setState({grid: newGrid})
                  
                  }
              }
            >  <a> Generate Maze</a> </a>
          </div> 
        </div>
       <a href="http://localhost:3000/"> <b> Reset</b></a>
      </div>

      <div className="grid"> 
        {grid.map((row, rowIdx) => { 
          return (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const {row, col, isFinish, isStart, isWall} = node;
                return (
                  <Node
                    key={nodeIdx}
                    col={col}
                    isFinish={isFinish}
                    isStart={isStart}
                    isWall={isWall}
                    mouseIsPressed={mouseIsPressed}
                    onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                    onMouseEnter={(row, col) =>
                      this.handleMouseEnter(row, col)
                    }
                    onMouseUp={() => this.handleMouseUp()}
                    row={row}></Node>
                );
              })}
            </div>
          );
        })}
      </div>
    </> 
    );     
  }
};

const getInitialGrid = () => {
  const grid = []
  for (let row = 0; row < 20; row++) {
    const temp = [];
    for (let col = 0; col < 50; col++) {
      temp.push(createNode(col, row));
    }
    grid.push(temp);
  }
  return grid;
};
const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === 10 && col === 15,
    isFinish: row === 10&& col === 35,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

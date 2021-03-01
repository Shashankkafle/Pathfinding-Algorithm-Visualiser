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
import Table from 'react-bootstrap/Table'

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
          numberOfAlgos:0,
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
  clearWalls(){ 
    const {grid}=this.state    
    for(var i=0;i<grid.length;i++){
      for(var j=0;j<grid[i].length;j++){
            
        grid[i][j].isVisited=false
        grid[i][j].isWall=false
        if((!grid[i][j].isStart)&&(!grid[i][j].isFinish))
        document.getElementById(`node-${grid[i][j].row}-${grid[i][j].col}`).className =
        'node ';
      }
    }
  }
  recordPerofrmence(algo,time,numberOfVisited,lengthOfSHortestPath){
    const {performance}=this.state;
    var tempPerformance = new Object();
    tempPerformance.algorithm=algo;
    tempPerformance.time=time;
    tempPerformance.shortestPathLength=lengthOfSHortestPath;
    tempPerformance.numberOfVisitedNodes=numberOfVisited;
    performance.push(tempPerformance);
   
  }

  displayPerformance(){
    
    const {performance} = this.state;
    const {numberOfAlgos}= this.state
    var colName=document.getElementById('algorithm')
    var colTime=document.getElementById('time')
    var colShortestDistance = document.getElementById('distance')
    var colNumberOfVisited= document.getElementById('visitedNodes')
    colName.innerHTML= 'algorithm' ;
    colTime.innerHTML= 'time';
    colShortestDistance.innerHTML = 'Shortest Path Length'
    colNumberOfVisited.innerHTML='Number Of Visited Nodes'
    var name=[],time=[],shrotestDistance=[],numberOfNodes=[];
    for(let i=0;i<numberOfAlgos;i++){
      name[i]=document.getElementById('name'+i)
      time[i]=document.getElementById('time'+i)
      shrotestDistance[i]= document.getElementById('distance'+i)
      numberOfNodes[i]=document.getElementById('visitedNodes'+i)
      name[i].innerHTML= performance[i].algorithm;;
      time[i].innerHTML= performance[i].time.toString() +' ms';
      shrotestDistance[i].innerHTML =  performance[i].shortestPathLength.toString();
      numberOfNodes[i].innerHTML=performance[i].numberOfVisitedNodes.toString()
    }
  }

  // showComparison(){
  //   const {performance} = this.state;
  //   const {numberOfAlgos}= this.state
  //   var tempPerformance=performance
  //   tempPerformance.sort((a,b)=>{
  //     return(a.time>b.time) ? 1:-1
  //   })
  //   document.getElementById('timelist').innerHTML='Algorithms ordered based on time:'
  //   for(let i=0;i<numberOfAlgos;i++){
  //     console.log(i)
  //    document.getElementById('timerow'+i).innerHTML=tempPerformance[i].algorithm    
  //   }
  //   tempPerformance.sort((a,b)=>{
  //     return(a.numberOfVisitedNodes>b.numberOfVisitedNodes) ? 1:-1
  //   })
    
  //   document.getElementById('spacelist').innerHTML='Algorithms ordered based on space:'
  //   for(let i=0;i<numberOfAlgos;i++){
  //     document.getElementById('spacerow'+i).innerHTML=tempPerformance[i].algorithm   

  //    }   
      
    
  // }

 
  animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder) {
    // if(visitedNodesInOrder==null){
    //   throw(noPathError)
    //   this.clearWalls()
    //   this.startVisualization()
    // }
    for (let i=0; i <= visitedNodesInOrder.length; i++) {
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
    let j = 0
    for (let i=0; i < nodesInShortestPathOrder.length; i++) 
    {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        if(!(nodesInShortestPathOrder[i].isStart||nodesInShortestPathOrder[i].isFinish))
        {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
        } 
      }, 30 * i);
      j++;
    }
    setTimeout(() => {
     this.clearGrid()
    }, 20 * j*2);
    setTimeout(() => {
      this.startVisualization()
        }, 20 * j*2);
    
  }

  visualizeDijkstra() {
    const {grid} = this.state;
    const startNode = grid[10][15];
    const finishNode = grid[10][35];
    var t0=performance.now()
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    var t1=performance.now()
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
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
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
    this.recordPerofrmence('astar',t1-t0,visitedNodesInOrder.length+1,nodesInShortestPathOrder.length)
  }


  visualizeBfs() { 
    const {grid} = this.state;
    const startNode = grid[10][15];
    const finishNode = grid[10][35];
    var t0=performance.now()
    const visitedNodesInOrder =  unweightedSearchAlgorithm(grid, startNode, finishNode);
    var t1=performance.now()
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);  
    this.recordPerofrmence('bfs',t1-t0,visitedNodesInOrder.length,nodesInShortestPathOrder.length)
  }

  visualizeDfs() {
    const {grid} = this.state;
    const startNode = grid[10][15];
    const finishNode = grid[10][35];
    var t0=performance.now()
    const visitedNodesInOrder =  dfs(grid, startNode, finishNode);
    var t1=performance.now()
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);  
    this.recordPerofrmence('dfs',t1-t0,visitedNodesInOrder.length,nodesInShortestPathOrder.length)
  }

  selectionfunction(algo){
    const {currentAlgorithm}= this.state
    const {numberOfAlgos}= this.state
    if(!currentAlgorithm.includes(algo)){
    currentAlgorithm.push(algo)
    this.setState({
      numberOfAlgos:numberOfAlgos+1
    })
   }
  }
  
  startVisualization(){
      const {currentAlgorithm}= this.state
      
      var algo=currentAlgorithm.pop()
      
     var currentAlgo= document.getElementById('currentAlgo')
     if(algo!=undefined){
     currentAlgo.innerHTML= 'Current Algorithm: '+ ' ' + algo;
     }
     else{
      currentAlgo.innerHTML=''
     }

      if(algo=='dijsktras'){
        
        this.visualizeDijkstra()        
      }
      if(algo=='astar'){
       
        this.visualizeAstar()
      }
      if(algo=='bfs'){
        this.visualizeBfs()
      }

      if(algo=='dfs'){
        this.visualizeDfs()
      }

      if(currentAlgorithm.length === 0){
      
        this.displayPerformance();
      }
  }

  render() {
    
    const {grid, mouseIsPressed} = this.state;
    
    return (
      <>
      <div className="navBar">
        <a href="http://localhost:3000/" className='onlyLeft'>  <b> Pathfinding Visualizer </b></a>
        <a>  <button onClick={()=>this.startVisualization()} className="newTools"> <b>Visualize!</b> </button></a>
       
        
	      <div className="dropDown"> 
          <label className="dropBtn"><b> Algorithms </b></label>
          <select className="dropdown-algo" id="dropdown-algo" multiple>
          <option onClick={()=>this.selectionfunction('dijsktras')} id='dijsktras' className="algoBar"> Dijkstra's algorithm </option> 
          <option  onClick={()=>this.selectionfunction('astar')} id='astar' className="algoBar">  Astar algorithm  </option>
          <option  onClick={()=>this.selectionfunction('bfs') }id='bfs' className="algoBar">  Bfs algorithm  </option>
          <option  onClick={()=>this.selectionfunction('dfs')} id='dfs'className="algoBar" >  Dfs algorithm   </option>
          </select> 
        </div>

        <a>  <button onClick={()=>this.clearGrid()} className="newTools"> <b>Clear Grid </b> </button></a>

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
       {/* <a>  <button onClick={()=> this.showComparison()}>Show Comparison</button></a> */}
      </div>

     <div id='tableContainer'> 
      <ul > <div id='timelist'></div>
        <li id='timerow0'></li>
        <li id='timerow1'></li>
        <li id='timerow2'></li>
        <li id='timerow3'></li>
       </ul> 
       <ul > <div id='spacelist'></div>
        <li id='spacerow0'></li>
        <li id='spacerow1'></li>
        <li id='spacerow2'></li>
        <li id='spacerow3'></li>
       </ul>         
         
        <Table>
          <thead>
            <tr>
              <th id='algorithm'></th>
              <th id='time'></th>
              <th id='distance'></th>
              <th id='visitedNodes'></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td id='name0'></td>
              <td id='time0'></td>
              <td id='distance0'></td>
              <td id='visitedNodes0'></td>
            </tr>
            <tr>
              <td id='name1'></td>
              <td id='time1'></td>
              <td id='distance1'></td>
              <td id='visitedNodes1'></td>
            </tr>
            <tr>
              <td id='name2'></td>
              <td id='time2'></td>
              <td id='distance2'></td>
              <td id='visitedNodes2'></td>
            </tr>
            <tr>
              <td id='name3'></td>
              <td id='time3'></td>
              <td id='distance3'></td>
              <td id='visitedNodes3'></td>
            </tr>
          </tbody>
        </Table>
      </div> 

      <div id='currentAlgo'></div>


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

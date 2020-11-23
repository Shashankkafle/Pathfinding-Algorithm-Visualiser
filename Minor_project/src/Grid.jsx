import React from 'react'
import { Component } from 'react'
import Node from './Node.jsx'
import './grid.css'
import {getAllNodes, getNodesInShortestPathOrder} from './Algorithms/AlgoTools'
import {dijkstra} from './Algorithms/Algorithm';

export default class Grid extends Component
{
  constructor() 
    {
        super();
        this.state = {
          grid: [],
          mouseIsPressed: false,
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
  visualizeDijkstra()
  {
    const {grid} = this.state;
    console.log(grid[0])
    console.log(getAllNodes(grid))
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 2 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 2 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 20 * i);
    }
  }

  visualizeDijkstra() {
    const {grid} = this.state;
    const startNode = grid[10][15];
    const finishNode = grid[10][35];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  generateWall1()
  {
    const {grid}=this.state
    for(var i=0;i<grid.length;i++)
    {
      for(var j=0;j<grid[i].length;j++)
      {
        if((Math.random())<0.1)
        {
          grid[i][j].isWall= true
        }
      }
    }
    this.setState({grid: grid});
  }

  generateWall2()
  {
    const {grid}=this.state
    for(var i=0;i<grid.length;i++)
    {
      for(var j=0;j<grid[i].length;j++)
      {
        if((Math.random())<0.2)
        {
          grid[i][j].isWall= true
        }
      }
    }
    this.setState({grid: grid});
  }

  generateWall3()
  {
    const {grid}=this.state
    for(var i=0;i<grid.length;i++)
    {
      for(var j=0;j<grid[i].length;j++)
      {
        if((Math.random())<0.3)
        {
          grid[i][j].isWall= true
        }
      }
    }
    this.setState({grid: grid});
  }



  render() {
    
    const {grid, mouseIsPressed} = this.state;
    
    return (
      <>
      {/* <button onClick={() => this.visualizeDijkstra()}>
        Visualize Dijkstra's Algorithm(currently not working)
      </button> */}
      <div className="navBar">
        <a href="http://localhost:3000/">  <b> Pathfinding Visualizer </b></a>
        
        <div className="dropDown"> 
          <a className="dropBtn"><b> Algorithms </b></a>
          <div className="dropdown-algo">
          <a onClick={() => this.visualizeDijkstra()}> <a> Dijkstra's algorithm</a> </a>
           <a> A* Algorithm</a>
           <a> Depth First Search</a>
          </div> 
        </div>

        <div className="wall"> 
          <a className="dropWall"><b> Wall </b> </a>
          <div className="dropdown-wall">
            <a onClick={() => this.generateWall1()}>  <a> Level 1</a> </a> 
            <a onClick={() => this.generateWall2()}>  <a> Level 2</a> </a> 
            <a onClick={() => this.generateWall3()}>  <a> Level 3</a> </a> 
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
    isFinish: row === 10 && col === 35,
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


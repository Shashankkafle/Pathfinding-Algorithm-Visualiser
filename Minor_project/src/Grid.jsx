import React from 'react'
import CreateNode from './CreateNode'
import { Component } from 'react'
import Node from './Node'
import './grid.css'

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

    render() {
        const {grid, mouseIsPressed} = this.state;
    
        return (
          <>
            <button onClick={() => this.visualizeDijkstra()}>
              Visualize Dijkstra's Algorithm(currently not working)
            </button>
            <div className="grid">asd 
              {grid.map((row, rowIdx) => { {console.log(row)}
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

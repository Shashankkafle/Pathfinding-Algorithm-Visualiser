import React from 'react'
import { Component } from 'react'
import'./node.css'

export default class Node extends Component {
    render() {
      const {
        col,
        isFinish,
        isStart,
        isWall,
        onMouseDown,
        onMouseEnter,
        onMouseUp,
        row,
      } = this.props;
      const extraClassName = isFinish
        ? 'node-finish'
        : isStart
        ? 'node-start'
        : isWall
        ? 'node-wall'
        : '';
  
      return (
        <div
          id={`node-${row}-${col}`}
          className={`node ${extraClassName}`}
          onMouseDown={() => onMouseDown(row, col)}
          onMouseEnter={() => onMouseEnter(row, col)} 
          // className='node'
          onMouseUp={() => onMouseUp()}>
        </div> 
      );
    }
  }
/*var hover{
    React.createClass(
      {
        getInitialState: function()
      }
      return{
        hover: false
      };
    );
  }
  onMouseEnterHandler: function(){
    this.setState({
      hover: true
    });
    console.log('enter');
  }
  onmouseleaveHandler: function */
  

  
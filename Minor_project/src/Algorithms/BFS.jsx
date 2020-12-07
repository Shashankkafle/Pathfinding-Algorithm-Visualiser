import {getUnvisitedNeighbors} from './AlgoTools';

export function unweightedSearchAlgorithm(grid,startNode,finishNode,name) {
  console.log(name);
  const queue = [];
  queue.push(startNode);

  while(queue.length > 0) {
    let currentNode  = name === "bfs" ? queue.shift() : queue.pop(); 
    if(currentNode.isWall) continue;
    queue.push(currentNode);
    currentNode.isVisited = true;
    if(currentNode === finishNode) {
      return queue;
    }
    let edges = getUnvisitedNeighbors(currentNode, grid, name);
    for (let i = 0; i < edges.length; i++){
      let neighbor = edges[i];
      if(!neighbor.isVisited) {
        neighbor.isVisited = true;
        neighbor.previousNode = currentNode;
        queue.push(neighbor);
      }
    } 
  }
  return queue;
}


// function getUnvisitedNeighbors(node, grid, name) {
//   const neighbors = [];
//   const {col, row} = node;

//   if (row > 0) {
//     if (name === "bfs") {
//       neighbors.push(grid[row - 1][col]);
//     } else {
//       neighbors.unshift(grid[row - 1][col]);
//     }
//   }

//   if (row < grid.length - 1) {
//     if (name === "bfs") {
//       neighbors.push(grid[row + 1][col]);
//     } else {
//       neighbors.unshift(grid[row + 1][col]);
//     }
//   } 

//   if (col > 0) {
//     if (name === "bfs") {
//       neighbors.push(grid[row][col - 1]);
//     } else {
//       neighbors.unshift(grid[row][col - 1]);
//     }
//   } 

//   if (col < grid[0].length - 1) {
//     if (name === "bfs") {
//       neighbors.push(grid[row][col + 1]);
//     } else {
//       neighbors.unshift(grid[row][col + 1]);
//     }
//   }
//   return neighbors.filter(neighbor => !neighbor.isVisited);
// }


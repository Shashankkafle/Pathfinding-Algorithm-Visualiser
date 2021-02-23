export function dfs(grid,startNode,finishNode) {

    const queue = [];
    queue.push(startNode);
    while(queue.length > 0) {
      let currentNode;
      currentNode = queue.pop();
    //   if(currentNode.isWall) continue;
    //  queue.push(currentNode);
      currentNode.isVisited = true;
      if(currentNode.isWall) continue;
      if(currentNode === finishNode) {
        return queue;
      }
     // console.log('currentNode')
     // console.log(currentNode)
      let edges = getUnvisitedNeighbors(currentNode, grid);
      /////console.log('edges')
      ////console.log(edges)
      for (let i = 0; i < edges.length; i++){
        let neighbor = edges[i];
        if(!neighbor.isVisited) {
        //neighbor.isVisited = true;
          if(neighbor.isWall) continue;
          neighbor.previousNode = currentNode;
          queue.push(neighbor);    
        }
      } 
    }
    return queue;
}
  
function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
  
    if (row > 0) {
        //console.log(0)
        neighbors.unshift(grid[row - 1][col]);
    }//up
    if (col < grid[0].length - 1) {
        //console.log(3)
        neighbors.unshift(grid[row][col + 1]);
    }//right
    if (row < grid.length - 1) {
      // console.log(1)
       neighbors.unshift(grid[row + 1][col]);
    }//down 
    if (col > 0) {
        ////console.log(2)
        neighbors.unshift(grid[row][col - 1]);
    }//left 
    return neighbors.filter(neighbor => !neighbor.isVisited);
}
                          
  
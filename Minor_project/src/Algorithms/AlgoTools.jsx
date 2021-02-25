 
  export function getAllNodes(grid) {
    const nodes = [];
    for (var i=0;i<grid.length;i++) {
      for (var j=0;j<(grid[i].length);j++) {
        nodes.push(grid[i][j]);
      }
    }
    return nodes;
  }
  export function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) {neighbors.push(grid[row - 1][col]); }
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
  }
  export function getUnvisitedNeighborsforAstar(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) {neighbors.push(grid[row - 1][col]); }
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isWall)  }
 
  export function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = node.distance + 1;
      neighbor.previousNode = node;
      

    }
  }
  export function updateUnvisitedNeighborsforastar(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighborsforAstar(node, grid);
    for (const neighbor of unvisitedNeighbors) {
      
      
      neighbor.previousNode = node;
      
    }
    return unvisitedNeighbors
  }
export function getNodesInShortestPathOrder(finishNode) {
    
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
  return nodesInShortestPathOrder;
}
export function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}
export function findCost(node,finishNode)
{
  node.heruistic=getManhattan(node,finishNode)
    node.cost=node.distance+ node.heruistic
    
  
}
function getManhattan(node,finishNode)
{
  return(Math.abs(finishNode.col-node.col)+Math.abs(finishNode.row-node.row))
}

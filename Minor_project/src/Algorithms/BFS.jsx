
export function unweightedSearchAlgorithm(grid, startNode, finishNode) {
  const queue = [];
  const visitedNodesInOrder = [];

  startNode.isVisited = true;
  queue.push(startNode);

  while (queue.length > 0) {
      let node = queue.shift();

      if (finishNode === node)
          return visitedNodesInOrder;

      if (node.isWall) continue;

      const neighbors = getUnvisitedNeighbors(grid, node);

      for (let i = 0; i < neighbors.length; i++) {
          let neighbor = neighbors[i];
          neighbor.isVisited = true;
          neighbor.previousNode = node;
          visitedNodesInOrder.push(neighbor);
          queue.push(neighbor);
      }
  }

  return visitedNodesInOrder;
}

function  getUnvisitedNeighbors(grid, node) {
  const ROWS = grid.length;
  const COLS = grid[0].length;

  const { row, col } = node;
  const neighbors = [];

  if (
      row + 1 >= 0 &&
      row + 1 < ROWS &&
      col >= 0 &&
      col < COLS &&
      !grid[row + 1][col].isVisited &&
      !grid[row + 1][col].isWall
  ) {
      neighbors.push(grid[row + 1][col]);
  }
  if (
      row - 1 >= 0 &&
      row - 1 < ROWS &&
      col >= 0 &&
      col < COLS &&
      !grid[row - 1][col].isWall &&
      !grid[row - 1][col].isVisited
  ) {
      neighbors.push(grid[row - 1][col]);
  }
  if (
      row >= 0 &&
      row < ROWS &&
      col - 1 >= 0 &&
      col - 1 < COLS &&
      !grid[row][col - 1].isWall &&
      !grid[row][col - 1].isVisited
  ) {
      neighbors.push(grid[row][col - 1]);
  }
  if (
      row >= 0 &&
      row < ROWS &&
      col + 1 >= 0 &&
      col + 1 < COLS &&
      !grid[row][col + 1].isWall &&
      !grid[row][col + 1].isVisited
  ) {
      neighbors.push(grid[row][col + 1]);
  }

  return neighbors;
}
export function dfs(grid, startNode, finishNode) {
  const stack = [];
  const visitedNodesInOrder = [];

  startNode.isVisited = true;
  stack.push(startNode);

  while (stack.length > 0) {
    let currentNode = stack.pop();

    currentNode.isVisited = true;

    if (finishNode === currentNode) {
      return visitedNodesInOrder;
    }

    if (currentNode.isWall) continue;

    let neighbors = getUnvisitedNeighbors(grid, currentNode);

    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];
      if (!neighbor.isVisited) {
        neighbor.previousNode = currentNode;
        visitedNodesInOrder.push(neighbor);
        stack.push(neighbor);
      }
    }
  }
  return visitedNodesInOrder;
}

function getUnvisitedNeighbors(grid, node) {
  const ROWS = grid.length;
  const COLS = grid[0].length;

  const { row, col } = node;
  const neighbors = [];

  if (
    row - 1 >= 0 &&
    row - 1 < ROWS &&
    col >= 0 &&
    col < COLS &&
    !grid[row - 1][col].isWall &&
    !grid[row - 1][col].isVisited
  ) {
    neighbors.unshift(grid[row - 1][col]);
  }

  if (
    row >= 0 &&
    row < ROWS &&
    col + 1 >= 0 &&
    col + 1 < COLS &&
    !grid[row][col + 1].isWall &&
    !grid[row][col + 1].isVisited
  ) {
    neighbors.unshift(grid[row][col + 1]);
  }

  if (
    row + 1 >= 0 &&
    row + 1 < ROWS &&
    col >= 0 &&
    col < COLS &&
    !grid[row + 1][col].isVisited &&
    !grid[row + 1][col].isWall
  ) {
    neighbors.unshift(grid[row + 1][col]);
  }

  if (
    row >= 0 &&
    row < ROWS &&
    col - 1 >= 0 &&
    col - 1 < COLS &&
    !grid[row][col - 1].isWall &&
    !grid[row][col - 1].isVisited
  ) {
    neighbors.unshift(grid[row][col - 1]);
  }

  return neighbors;
}

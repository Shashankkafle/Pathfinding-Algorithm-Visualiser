import { getUnvisitedNeighborsforAstar, findCost } from "./AlgoTools";

export function aStar(grid, startNode, finishNode) {
  startNode.distance = 0;
  startNode.cost = 0;
  var unvisitedNodes = [];
  var visitedNodes = [];
  unvisitedNodes.push(startNode);
  while (unvisitedNodes.length > 0) {
    var cheapestIndex = 0,
      cheapestNode = unvisitedNodes[0];
    for (let i = 0; i < unvisitedNodes.length; i++) {
		if (unvisitedNodes[i].cost < cheapestNode.cost) {
			cheapestIndex = i;
		}
	}
	cheapestNode = unvisitedNodes[cheapestIndex];
	if (cheapestNode.isFinish) {
		visitedNodes.push(finishNode);
		return visitedNodes;
	}
	unvisitedNodes.splice(cheapestIndex, 1);
	visitedNodes.push(cheapestNode);
	var unvisitedNeighbours = getUnvisitedNeighborsforAstar(cheapestNode, grid);

	for (let j = 0; j < unvisitedNeighbours.length; j++) {
		if (!visitedNodes.includes(unvisitedNeighbours[j])) {
			var tempdist = cheapestNode.distance + 1;
			var newPath = false;
			if (unvisitedNodes.includes(unvisitedNeighbours[j])) {
				if (tempdist < unvisitedNeighbours[j].distance) {
					unvisitedNeighbours[j].distance = tempdist;
					newPath = true;
				}
			} else {
				unvisitedNeighbours[j].distance = tempdist;
				newPath = true;
				unvisitedNodes.push(unvisitedNeighbours[j]);
			}
			if (newPath) {
				findCost(unvisitedNeighbours[j], finishNode);
				unvisitedNeighbours[j].previousNode = cheapestNode;
			}
			findCost(unvisitedNeighbours[j], finishNode);
		}
	}
  }

  return visitedNodes;
}

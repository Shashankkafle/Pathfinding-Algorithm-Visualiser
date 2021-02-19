import {getAllNodes,getUnvisitedNeighborsforAstar,sortNodesByDistance,findCost,updateUnvisitedNeighborsforastar } from "./AlgoTools";

export function aStar(grid, startNode, finishNode)
{
   
    startNode.distance = 0;
    startNode.cost = 0

    var unvisitedNodes=[]

    var visitedNodes=[] 
    unvisitedNodes.push(startNode)
   
   

    while(unvisitedNodes.length>0)
    {      var cheapestIndex=0,cheapestNode=unvisitedNodes[0]         
       
         for(var i=0;i<unvisitedNodes.length;i++) 
        { 
            if(unvisitedNodes[i].cost<cheapestNode.cost)
            { 
                
                cheapestIndex=i
            }
        }
       
        cheapestNode=unvisitedNodes[cheapestIndex]
        unvisitedNodes.splice(cheapestIndex,1)
        visitedNodes.push(cheapestNode) 
        if(cheapestNode.isFinish)
        { 
            return(visitedNodes)
        }  
        unvisitedNodes.splice(cheapestIndex,1)  
        visitedNodes.push(cheapestNode)
        
       
        var unvisitedNeighbours=getUnvisitedNeighborsforAstar(cheapestNode,grid)  
        
        for(var i=0;i<unvisitedNeighbours.length;i++) 
        {          
           
            if(!visitedNodes.includes(unvisitedNeighbours[i])&&(!unvisitedNeighbours[i].isWall))
            {
                var tempdist=cheapestNode.distance+1
                var newPath = false;
                if(unvisitedNodes.includes(unvisitedNeighbours[i]))
                {
                    if(tempdist<unvisitedNeighbours[i].distance)
                    {
                        unvisitedNeighbours[i].distance=tempdist
                        newPath=true
                    }
                }
                else
                {
                    unvisitedNeighbours[i].distance=tempdist
                    newPath=true
                    unvisitedNodes.push(unvisitedNeighbours[i])
                }
                if(newPath){
                   findCost(unvisitedNeighbours[i],finishNode)
                   unvisitedNeighbours[i].previousNode= cheapestNode
                }
                findCost(unvisitedNeighbours[i],finishNode)
            }
           
        }
        
       
        
          
    }
    return null
}
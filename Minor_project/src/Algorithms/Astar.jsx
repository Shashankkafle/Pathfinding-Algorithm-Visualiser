import {getAllNodes,getUnvisitedNeighbors,sortNodesByDistance,findCost,updateUnvisitedNeighborsforastar } from "./AlgoTools";

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
        { console.log(visitedNodes[0])
            return(visitedNodes)
        }    
       
        var unvisitedNeighbours=updateUnvisitedNeighborsforastar(cheapestNode,grid)  
        
        for(var i=0;i<unvisitedNeighbours.length;i++) 
        {          
           
            if(!visitedNodes.includes(unvisitedNeighbours[i]))
            {
                var tempdist=cheapestNode.distance+1
                if(unvisitedNodes.includes(unvisitedNeighbours[i]))
                {
                    if(tempdist<unvisitedNeighbours[i].distance)
                    {
                        unvisitedNeighbours[i].distance=tempdist
                    }
                }
                else
                {
                    unvisitedNeighbours[i].distance=tempdist
                    unvisitedNodes.push(unvisitedNeighbours[i])
                }
                findCost(unvisitedNeighbours[i],finishNode)
            }
           
        }
        
       
        
          
    }
    return null
}
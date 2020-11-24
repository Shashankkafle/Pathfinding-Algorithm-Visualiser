export function createMaze(grid)
    {
        const newGrid=grid
        for(var i=0;i<newGrid.length;(i=i+2))
        {
            for(var j=0;j<newGrid[i].length;j++)
            {
                
                
                    newGrid.isWall=true
                    console.log( newGrid.isWall+' '+i+' '+j)
                    
            
                
            }
            const rand=Math.floor(Math.random()*newGrid[i].length) //generate random num betn 0 and newGrid[i].length
            newGrid.isWall=false
            
        }
        return newGrid
    }
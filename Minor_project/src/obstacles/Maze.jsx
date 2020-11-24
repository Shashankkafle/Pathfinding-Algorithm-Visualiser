export function createMaze(grid)
    {
        const newGrid=grid
        var row=0
        for(var col=0;col<newGrid[0].length;col+=2)
        {
            for( row=0;row<newGrid.length;row++)
            {
                
                
                    newGrid[row][col].isWall=true
                   
                    
            
                
            }
            const rand=generateRandomNumber(newGrid.length)
            newGrid[rand][col].isWall=false
            
        }
        return newGrid
    }
function generateRandomNumber(max)
{
    return(Math.floor(Math.random()*max))
}
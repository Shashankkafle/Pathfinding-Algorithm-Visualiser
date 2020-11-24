export  function generateWall1(grid)
  {
    const newGrid=grid
    for(var i=0;i<newGrid.length;i++)
    {
      for(var j=0;j<newGrid[i].length;j++)
      {
        if((Math.random())<0.1)
        {
          newGrid[i][j].isWall= true
        }
      }
    }
   return newGrid
  }
  export  function generateWall2(grid)
  {
    const newGrid=grid
    for(var i=0;i<grid.length;i++)
    {
      for(var j=0;j<newGrid[i].length;j++)
      {
        if((Math.random())<0.2)
        {
          newGrid[i][j].isWall= true
        }
      }
    }
   return newGrid
  }
  export  function generateWall3(grid)
  {
    const newGrid=grid
    for(var i=0;i<newGrid.length;i++)
    {
      for(var j=0;j<grid[i].length;j++)
      {
        if((Math.random())<0.3)
        {
          newGrid[i][j].isWall= true
        }
      }
    }
   return newGrid
  }
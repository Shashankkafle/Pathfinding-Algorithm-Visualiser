import React from 'react'
import CreateNode from './CreateNode'
import { Component } from 'react'


const CreateGrid=()=>{
    var temp=[],Grid=[]
    for (var i=0;i<4;i++){
        for(var j=0;j<4;j++)
        {
            temp[j]= CreateNode(i,j)
        }
        Grid[i]=temp

    }
    return(
        <div>
            {Grid}
        
        </div>
    )
};
export default CreateGrid;
import React from 'react'

export const Search=(props)=>{
 return(
     <div>
         <label>Search Bar</label>
         <input onChange={(e)=>{props.search(e)}} ></input>
     </div>
 )
}
import React from 'react'

export const Search = (props) => {
    return (
        <div>
            <label>Search: </label>
            <input
                onChange={(e) => props.search(e)}
                type="text"
                placeholder="Search for a toy..."
            />    
        </div>
    )
}

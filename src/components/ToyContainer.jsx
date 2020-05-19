import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
  return(
    <div id="toy-collection">
    {  props.toys.map(toy=>(
          <ToyCard name={toy.name}
          likes={toy.likes}
          image={toy.image}
          incrementLikes={props.incrementLikes}
          handleDelete={props.handleDelete}
          toy={toy}
          
          />
    ))}
    </div>
  );
}

export default ToyContainer;

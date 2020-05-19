import React from 'react';
import ToyCard from './ToyCard.jsx'

const ToyContainer = (props) => {
  return(
    <div id="toy-collection">
      {props.toys.map(toy=> <ToyCard toy={toy} removeToy={props.removeToy}/>)}
    </div>
  );
}

export default ToyContainer;

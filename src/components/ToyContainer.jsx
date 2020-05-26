import React from "react";
import ToyCard from "./ToyCard";

const ToyContainer = (props) => {
  return (
    <div>
      {props.toys.map((toy) => (
        <ToyCard toy={toy} deleteToy={props.deleteToy} key={toy.id} />
      ))}
    </div>
  );
};

export default ToyContainer;

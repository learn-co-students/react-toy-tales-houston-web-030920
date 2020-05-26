import React from "react";
import "./App.css";

import Header from "./components/Header";
import ToyForm from "./components/ToyForm";
import ToyContainer from "./components/ToyContainer";

class App extends React.Component {
  state = {
    display: false,
    toys: [],
  };

  handleClick = () => {
    let newBoolean = !this.state.display;
    this.setState({
      display: newBoolean,
    });
  };

  componentDidMount() {
    fetch("http://localhost:3000/toys")
      .then((resp) => resp.json())
      .then((toyList) => {
        this.setState({
          toys: toyList,
        });
      });
  }

  handleSubmit = (toy) => {
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: toy.name,
        image: toy.image,
        likes: 0,
      }),
    })
      .then((resp) => resp.json())
      .then((toy) => {
        this.setState({
          toys: [...this.state.toys, toy],
        });
      });
  };

  handleDelete = (clickedToy) => {
    fetch(`http://localhost:3000/toys/${clickedToy.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.setState({
      toys: this.state.toys.filter((toy) => toy.id !== clickedToy.id),
    });
  };

  render() {
    return (
      <>
        <Header />
        {this.state.display ? <ToyForm form={this.handleSubmit} /> : null}
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} deleteToy={this.handleDelete} />
      </>
    );
  }
}

export default App;

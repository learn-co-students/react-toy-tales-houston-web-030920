import React, { Component } from "react";

class ToyCard extends Component {
  state = {
    name: this.props.toy.name,
    image: this.props.toy.image,
    likes: this.props.toy.likes,
    id: this.props.toy.id,
  };

  handleLike = (likedToy) => {
    fetch(`http://localhost:3000/toys/${likedToy}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: this.state.likes + 1,
      }),
    })
      .then((resp) => resp.json())
      .then((toy) => {
        this.setState({
          likes: toy.likes,
        });
      });
  };

  render() {
    return (
      <div className="card">
        <h2>{this.state.name}</h2>
        <img
          src={this.state.image}
          alt={this.state.name}
          className="toy-avatar"
        />
        <p>{this.state.likes} Likes </p>
        <button
          className="like-btn"
          onClick={() => this.handleLike(this.state.id)}
        >
          Like {"<3"}
        </button>
        <button
          className="del-btn"
          onClick={() => this.props.deleteToy(this.state)}
        >
          Donate to GoodWill
        </button>
      </div>
    );
  }
}

export default ToyCard;

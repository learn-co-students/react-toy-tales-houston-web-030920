import React, { Component } from 'react';

class ToyCard extends Component {

  state = {
    likes: this.props.toy.likes
  }

  likeTrig = (toy) => {
    this.state.likes ++
    fetch(`http://localhost:3000/toys/${toy.id}`,{
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        likes: this.state.likes
      })
    })
    .then(res => res.json())
    .then(toy => (
      this.setState({likes: toy.likes})
    ))
  }

  render() {
    return (
      <div className="card">
        <h2>{this.props.toy.name}</h2>
        <img src={this.props.toy.image} alt={this.props.toy.name} className="toy-avatar" />
        <p>{this.state.likes} Likes </p>
        <button className="like-btn" onClick={() => this.likeTrig(this.props.toy)}>Like {'<3'}</button>
        <button className="del-btn" onClick={() => this.props.delToy(this.props.toy)}>Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;

import React, { Component } from 'react';

class ToyCard extends Component {

  state = {
    name: this.props.toy.name,
    id: this.props.toy.id,
    likes: this.props.toy.likes
  }

  //handle the delete functionallity
  handleDelete = (event) => {
      this.props.donateToCharity(this.state)
  }

  //handle liking a toy
  handleLike = (event) => {
    this.setState({
      likes: this.state.likes += 1
    })
    this.props.addALike(this.state)
  }

  render() {
    return (
      <div className="card">
        <h2>{this.props.toy.name}</h2>
        <img src={this.props.toy.image} alt={this.props.toy.name} className="toy-avatar" />
        <p>{this.state.likes} Likes </p>
        <button onClick={this.handleLike} className="like-btn">Like {'<3'}</button>
        <button onClick={this.handleDelete} className="del-btn">Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;

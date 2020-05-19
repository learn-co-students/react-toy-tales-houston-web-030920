import React, { Component } from 'react';

class ToyForm extends Component {
  state = {
    newToyName: '',
    newToyImage: '',
  }

  // http://www.pngmart.com/files/3/Toy-Story-Woody-PNG-Photos.png

  setName = (e) => {this.setState({newToyName: e.target.value})}
  setImage = (e) => {this.setState({newToyImage: e.target.value})}

  handleSubmit = (e) => {
    e.preventDefault()
    let newToy = {
      "name": this.state.newToyName,
      "image": this.state.newToyImage,
      "likes": 0
    }
    this.props.addToy(newToy)
  }

  render() {
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={this.handleSubmit}>
          <h3>Create a toy!</h3>
          <input type="text" name="name" placeholder="Enter a toy's name..." className="input-text" onChange={this.setName}/>
          <br/>
          <input type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text" onChange={this.setImage}/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;

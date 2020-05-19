import React, { Component } from 'react';

class ToyForm extends Component {
  constructor(){
    super()
    this.state= {
      name: '',
      image: ''
    }
  }

  setName = (e) => this.setState({ name: e.target.value })
  setImage = (e) => this.setState({ image: e.target.value })
  

  handleSubmit = (e) => {
    e.preventDefault()
    
    let toy = {
      name: this.state.name,
      image: this.state.image
    } 
    this.props.newToy(toy)
  } 
  render() {
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={this.handleSubmit}>
          <h3>Create a toy!</h3>
          <input
          onChange={this.setName}
          type="text" name="name" 
          placeholder="Enter a toy's name..." 
          className="input-text"/>
          <br/>
          <input 
          onChange={this.setImage}
          type="text" 
          name="image" 
          placeholder="Enter a toy's image URL..." 
          className="input-text"/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;

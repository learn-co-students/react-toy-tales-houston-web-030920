import React, { Component } from 'react';

class ToyForm extends Component {

  state = {
    name: '',
    image: ''
  }

  inputs = (i) => {
    this.setState({
      [i.name]: i.value
    })
  }
  
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.newToy(this.state)
    this.setState({name: '', image: ''})
  }

  render() {
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={(e) => this.handleSubmit(e)}>
          <h3>Create a toy!</h3>
          <input value={this.state.name} type="text" name="name" placeholder="Enter a toy's name..." className="input-text" onChange={(e) => this.inputs(e.target)}/>
          <br/>
          <input value={this.state.image} type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text" onChange={(e) => this.inputs(e.target)}/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;

import React, { Component } from 'react';

class ToyForm extends Component {

  state={
    name: null,
    image: null
  }

  setToyName = e => this.setState({name: e.target.value})
  setToyImage = e =>  this.setState({image: e.target.value})


  
  handleSubmit = (e)=>{
    e.preventDefault()
    this.props.addToy(this.state)
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}className="add-toy-form">
          <h3>Create a toy!</h3>
          <input type="text" name="name" placeholder="Enter a toy's name..." className="input-text" onChange={this.setToyName}/>
          <br/>
          <input type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text" onChange={this.setToyImage}/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;

import React, { Component } from 'react';

class ToyForm extends Component {

  state = {
    name: '',
    image: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  clearForm = (e) => {
    e.preventDefault()
    this.props.form(this.state)
    this.setState({
      name: '',
      image: ''
    })
  }

  render() {
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={(e) => this.clearForm(e)}>
          <h3>Create a toy!</h3>
          <input type="text" name="name" placeholder="Enter a toy's name..." className="input-text" value={this.state.name} onChange={(e) => this.handleChange(e)}/>
          <br/>
          <input type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text" value={this.state.image} onChange={(e) => this.handleChange(e)}/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;

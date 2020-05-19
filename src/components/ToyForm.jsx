import React, { Component } from 'react';

class ToyForm extends Component {
state={
  name: '',
  image:''
}

setName=e=> this.setState({name: e.target.value})
setImage=e=> this.setState({image:e.target.value})

handleSubmit=(e)=>{
e.preventDefault()
fetch('http://localhost:3000/toys', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: this.state.name,
    image: this.state.image
  })
  
})

// let newToy= {name: this.state.name,
// image: this.state.image}

this.props.getToys()
}



  render() {
    return (
      <div className="container">
        <form className="add-toy-form">
          <h3>Create a toy!</h3>
          <input type="text" name="name"  
          value={this.state.name} onChange={this.setName}
          placeholder="Enter a toy's name..." className="input-text"/>
          <br/>
          <input type="text" name="image"
          value={this.state.image}
          onChange={this.setImage} 
          placeholder="Enter a toy's image URL..." className="input-text"/>
          <br/>
          <input type="submit" name="submit" 
          onClick={this.handleSubmit}
          value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;

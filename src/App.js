import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

class App extends React.Component{

  state = {
    display: false,
    toys: []
  }

  componentDidMount(){
    fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(toys => (
      this.setState({
        toys: toys
      })
    ))
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  newToy = (toy) => {
    fetch("http://localhost:3000/toys",{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name: toy.name,
        image: toy.image,
        likes: 0
      })
    })
    .then(res => res.json())
    .then(toy => (
      this.setState({toys: [...this.state.toys, toy]})
    ))
  }

  delToy = (toy) => {
    fetch(`http://localhost:3000/toys/${toy.id}`,{
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        id: toy.id
      })
    })
    let delToy = toy
    this.setState({
      toys: this.state.toys.filter(toy => (
        toy != delToy
      ))
    })
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display ? <ToyForm newToy={this.newToy}/> : null}
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} delToy={this.delToy}/>
      </>
    );
  }

}

export default App;

import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

import toyData from './data';


class App extends React.Component{

  state = {
    display: false,
    toyData: [],
  }

  componentDidMount() {
    this.getToys()
  }

  getToys = () => {
    fetch('http://localhost:3000/toys')
      .then(resp => resp.json())
      .then(toys => this.setState ({
        toyData: toys
      }))
  }

  showForm = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  addToy = (newToy) => {
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newToy.name,
        image: newToy.image,
        likes: 0
      })
    })
    this.getToys()
  }

  deleteToy = (deletedToy) => {
    fetch(`http://localhost:3000/toys/${deletedToy.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.getToys()
  }

  addLike = (likedToy) => {
    fetch(`http://localhost:3000/toys/${likedToy.id}`, {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        likes: likedToy.likes += 1
      })
    })
    this.getToys()
  }

  render() {
    return (
      <>
        <Header/>
        { this.state.display ? <ToyForm toyData={this.state.ToyData} addToy={this.addToy}/> : null}
        <div className="buttonContainer">
          <button onClick={this.showForm}> Add a Toy </button>
        </div>
        <ToyContainer toyData={this.state.toyData} addLike={this.addLike}  deleteToy={this.deleteToy}/>
      </>
    );
  }

}

export default App;
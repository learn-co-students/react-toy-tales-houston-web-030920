import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'
import { Search } from './components/Search'
import data from './data.js'


class App extends React.Component{

  state = {
    display: false,
    toys: [],
    likes: '',
    query: ''
  }

  searchToy = (e) => {
    this.setState({ query: e.target.value})
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }
 
  newToy = (toy) => {
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        name: toy.name,
        image: toy.image,
        likes: 0
      })
    })
    .then(resp=>resp.json())
    .then(toy => {
      this.setState({ toys: [
        ...this.state.toys, 
        toy
      ]
    })
    })
  }
  
  componentDidMount(){
    this.fetchData()
  }

  fetchData = () => {
    fetch('http://localhost:3000/toys')
    .then(resp=>resp.json())
    .then(toys => {
      this.setState({ toys: toys})
    })
  }

  donateToy = (toy) => {
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'DELETE'
    })
    .then(resp => resp.json())
    .then(resp =>{
      this.fetchData()
    })
  }

  likeToy = (toy) => {
    let addLike = toy.likes += 1
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        likes: addLike
      })
    })
    .then(resp=>resp.json())
    .then(toy => {
      console.log(toy.likes)
      this.setState({
        likes: toy.likes
      })
    })
  }

  render(){
    let filteredToys = this.state.toys.filter(
      toy => toy.name.toLowerCase().includes(this.state.query)
    )
    console.log(this.state.query)
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm newToy={this.newToy}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
          <Search search={this.searchToy}/>
        </div>
        <ToyContainer 
        toys={filteredToys}
        delete={this.donateToy}
        like={this.likeToy}
        />
      </>
    );
  }

}

export default App;

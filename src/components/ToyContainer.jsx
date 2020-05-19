import React from 'react';
import ToyCard from './ToyCard'
import ToyForm from './ToyForm'
// import toyData from '../data.js'

//can simplify hierarchy, try not to change the order
//change to a class
class ToyContainer extends React.Component {

  //can only have access to state with hooks and use setstate method
  state = {
    toys: [],
    currentToys: []
  }
  //like button functionality
  addALike = (likedToy) => {
    console.log(likedToy)
        this.setState({
          toys: this.state.toys,
          currentToys: this.state.toys
        })
    fetch(`http://localhost:3000/toys/${likedToy.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        likes: likedToy.likes 
      })
    })
  }
  //delete button functionality
  donateToCharity = (delToy) => {
    console.log(delToy.id)
      this.setState({
        toys: this.state.toys.filter( toy => toy.id != delToy.id),
        currentToys: this.state.toys.filter( toy => toy.id != delToy.id)
      })
    fetch(`http://localhost:3000/toys/${delToy.id}`, {
      method: 'DELETE'
    })
    .then( resp => resp.json())
    .then((answer) => console.log(answer))
  }

  //add a new toy to the toys array
  addNewToy = (newToy) => {
    console.log(newToy)
    fetch(`http://localhost:3000/toys`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: newToy.name,
        image: newToy.image,
        likes: 0
      })
    })
      .then(resp => resp.json())
      .then((newToy) => {
        this.setState({
          toys: [...this.state.toys, newToy],
          currentToys: [...this.state.toys, newToy]
        })
      })
  }
  

  //fetch all toys form the database
  componentDidMount = () => {
    fetch(`http://localhost:3000/toys`)
      .then( resp => resp.json())
      .then( toys => {
        this.setState({
          toys: toys,
          currentToys: toys
        })
      })
  }

  render() {
    if(this.state.toys.length == 0){
      return <h1>Fetching toys...</h1>
    }
    // debugger
  return(
    <div id="toy-collection">  
     { this.props.display
      ?
      <ToyForm
        addNewToy={this.addNewToy}
      />
      :
    null
  }
    {this.state.currentToys.map(toy => 
      <ToyCard 
        key={toy.id}
        toy={toy}
        donateToCharity={this.donateToCharity}
        addALike={this.addALike}
      />
      )}
   
    </div>
    )
  }
}

export default ToyContainer;

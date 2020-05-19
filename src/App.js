import React from 'react';
import './App.css';

import Header from './components/Header.jsx'
import ToyForm from './components/ToyForm.jsx'
import ToyContainer from './components/ToyContainer.jsx'

// import toyData from './data'


class App extends React.Component{

  state = {
    display: false,
    toys: []
  }
  componentDidMount(){
   this.fetchToys()
  }

  fetchToys = ()=>{
    fetch('http://localhost:3000/toys')
    .then(resp=> resp.json())
    .then(toys => this.setState({
      toys:toys
    }))
  }
  addToy = (newToy) =>{
    console.log(newToy)
    fetch("http://localhost:3000/toys",{
      method: "POST", 
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        name: newToy.name,
        image: newToy.image
 
      })
    })
      .then(resp=>resp.json())
      .then(newToy=> this.setState({
        toys: [...this.state.toys, newToy]
      }))
   }

  removeToy = (toySelected) =>{
    console.log("remove toy runs", toySelected)
    fetch(`http://localhost:3000/toys/${toySelected.id}`,{
      method: "DELETE",
      headers:{
        'Content-Type': 'application/json'
      }
    })
    this.setState({
      toys: this.state.toys.filter(toy=> toy !== toySelected)
    })


  }
  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  render(){
    console.log(this.state.toys)
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm addToy={this.addToy}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys = {this.state.toys} removeToy={this.removeToy}/>
      </>
    );
  }

}

export default App;

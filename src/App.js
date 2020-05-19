import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'
import {Search} from './components/Search'
import toyData from './data'


class App extends React.Component{

  state = {
    display: true,
    toys:[],
    searchTerm:'',
    filteredToys:[]
  }

  componentDidMount(){
    this.getToys()
  }


getToys=()=>{
  fetch('http://localhost:3000/toys')
.then(res=>res.json())
.then(toys=> {
  this.setState({toys:toys,
  filteredToys: toys})
})
}




handleSearch=(e)=>{
    this.setState({
   filteredToys: this.state.toys.filter(toy=> toy.name.includes(e.target.value))})
   
}


  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  addToy=(toy)=>{ this.setState({
    toys: [...this.state.toys, toy]
  })
   
  }


  

 
  incrementLikes=(toy)=>{

  
 
    //fetch for the likes 

    let incrementingLikes= ++toy.likes
    fetch(`http://localhost:3000/toys/${toy.id}`,{
      method: "PATCH",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify({      
               likes:  incrementingLikes
        })
     })

     .then(res=>res.json())
     .then(toy=>{

      this.setState({
        toys: this.state.toys.map(currentToy=> {
          if(currentToy===toy){
            return {...toy, likes: toy.likes+1}
           }
          else{
            return currentToy
          }
        })
      })
     } 
     )}

     //alternative way to persist the likes
    //  let index= this.state.toys.indexOf(toy)
    //  this.setState({
    //  toys: [...this.state.toys.slice(0,index),
    //  {...toy, likes: toy.likes+1}, 
    //  ...this.state.toys.slice(index+1) ]
    //  })
  
  handleDelete=(dToy)=>{
    console.log(dToy)

    fetch(`http://localhost:3000/toys/${dToy.id}`,{
      method: "DELETE",
      headers:{
        "Content-Type": "application/json"
      }
     })
   
    this.setState({
      filteredToys: this.state.toys.filter(toy => toy !== dToy)
    })
  
  
  }

  render(){
    

    return (
      <>
        <Header/>
     
        { this.state.display
            ?
          <ToyForm getToys={this.getToys}/>
            :
          null
        }
        <div className="buttonContainer">
        <Search search={this.handleSearch}/>
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.filteredToys}
        handleDelete={this.handleDelete}
        incrementLikes={this.incrementLikes}/>
       
      </>
  
    );
  }

}

export default App;

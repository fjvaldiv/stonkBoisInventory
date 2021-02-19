import React, { Component } from 'react';
import Table from './Table';
import Form from './Form';
import axios from 'axios'

class App extends Component {
   state = {
      characters: []
   };

   makePostCall(character){
      return axios.post('http://localhost:5000/products', character)
       .then(function (response) {
         console.log(response);
         return response;
       })
       .catch(function (error) {
         console.log(error);
         return false;
       });
   }

   makeDeleteCall(id){
      console.log('http://localhost:5000/products/' + id)
      return axios.delete('http://localhost:5000/products/' + id)
       .then(function (response) {
         console.log(response);
         return (response.status === 200);
       })
       .catch(function (error) {
         console.log(error);
         return false;
       });
   }

   handleSubmit = character => {
      this.makePostCall(character).then( callResult => {
         console.log(callResult)
         console.log(character)
         if (callResult.status === 201) {
            this.setState({ characters: [...this.state.characters, callResult.data] });
         }
      });
   }

   removeCharacter = index => {
      const { characters } = this.state

      const character = characters.find((c, i) => {
         return i === index
      })

      console.log(character)

      this.makeDeleteCall(character.id).then( callResult => {
         if (callResult === true) {
            this.setState({
               characters: characters.filter((c, i) => {
                  return i !== index
               }),
            })
         }
      });
   }

   componentDidMount() {
      axios.get('http://localhost:5000/products')
       .then(res => {
         const characters = res.data.products_list;
         this.setState({ characters });
       })
       .catch(function (error) {
         //Not handling the error. Just logging into the console.
         console.log(error);
       });
   }

   render () {
      const { characters } = this.state;

      return (
         <div className="container">
            <Table characterData={characters} removeCharacter={this.removeCharacter} />
            <Form handleSubmit={this.handleSubmit} />
         </div>
      );
   }
}

export default App
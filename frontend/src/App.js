import React, { Component } from 'react';
import Table from './Table';
import Form from './Form';
import axios from 'axios';
import './index.scss';
import MyRouter from './MyRouter';

const Sidebar = (props) => {
   return(
     <div className='Sidebar'>
       <ul>
         <li className='add-new-item' onClick={() => props.changeTab(0)}><span>Add New Product</span></li>
         <li className={props.activeTab === 1 ? 'active':''} onClick={() => props.changeTab(1)}>Products</li>
         <li className='add-new-item' onClick={() => props.changeTab(2)}><span>Add New Order</span></li>
         <li className={props.activeTab === 3 ? 'active':''} onClick={() => props.changeTab(3)}>Orders</li>
         {/* <li className={props.activeTab === 3 ? 'active':''} onClick={() => props.changeTab(3)}>Item Archive</li> */}
       </ul>
     </div>
   );
}

class App extends Component {
   constructor() {
      super();
      
   }

   state = {
      characters: [],
      activeTab: 1,
      inventory: {
         categories:{
           dresses:[],
           shirts:[
 {category: "shirts", name: "Blue T-Shirt", price: "16.99", imageURL: "https://cdn.shopify.com/s/files/1/0797/0169/products/mockup-c6d64730_1024x1024.jpg"}],
           pants:[],
           accessories:[]
         }
      },
      newItemForm: {
         category: '',
         name: '',
         price: '',
         imageURL: ''
      }
   };

   changeActiveTab(index) {
      this.setState({activeTab: index});
   }

   changeNewItemForm(formData){
      this.setState({newItemForm: formData});
   }

   addNewProduct(product){
      
      this.setState({newItemForm: {category: '',name: '',price: '',imageURL: ''}});
      
      const decapitalize = (string) => {
        return string.charAt(0).toLowerCase() + string.slice(1);
      }
      
      product.category = decapitalize(product.category);
      let inventory = this.state.inventory;
      inventory.categories[product.category].push(product);
      
      this.setState({inventory:inventory});
   }

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

   // TODO: don't forget to write in docs to npm install node-sass

   render () {
      // const { characters } = this.state;

      return (
         <div className='App'>
            {/* <h2 className='header'><i className="icon-th-list"></i> Inventory Management Application Demo</h2> */}
            {/* <h1 className='title' onClick={() => this.changeActiveTab(1)}>Inventory</h1> */}
            <h1 className='title'>Inventory</h1>
            <div className='app-body'>
               <Sidebar activeTab={this.state.activeTab} changeTab={this.changeActiveTab.bind(this)}/>
               <MyRouter 
                  activeTab={this.state.activeTab} 
                  inventory={this.state.inventory}
                  newItemFormData={this.state.newItemForm}
                  changeNewItemForm={this.changeNewItemForm.bind(this)}
                  addNewProduct={this.addNewProduct.bind(this)}
               />
            </div>
         </div>
      );

      // return (
      //    <div className="container">
      //       <Table characterData={characters} removeCharacter={this.removeCharacter} />
      //       <Form handleSubmit={this.handleSubmit} />
      //    </div>
      // );
   }
}

export default App;
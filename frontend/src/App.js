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
      products: [],
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

   // TODO: Needs to either call makePostCall or be combined with makePostCall
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

   makePostCall(product){
      return axios.post('http://localhost:5000/products', product)
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

   handleSubmit = product => {
      this.makePostCall(product).then( callResult => {
         console.log(callResult)
         console.log(product)
         if (callResult.status === 201) {
            this.setState({ products: [...this.state.products, callResult.data] });
         }
      });
   }

   removeproduct = index => {
      const { products: products } = this.state

      const product = products.find((c, i) => {
         return i === index
      })

      console.log(product)

      this.makeDeleteCall(product.id).then( callResult => {
         if (callResult === true) {
            this.setState({
               products: products.filter((c, i) => {
                  return i !== index
               }),
            })
         }
      });
   }

   componentDidMount() {
      axios.get('http://localhost:5000/products')
       .then(res => {
         const products = res.data.products_list;
         this.setState({ products });
       })
       .catch(function (error) {
         //Not handling the error. Just logging into the console.
         console.log(error);
       });
   }

   // TODO: don't forget to write in docs to npm install node-sass

   render () {
      // const { products } = this.state;

      return (
         <div className='App'>
            {/* <h2 className='header'><i className="icon-th-list"></i> Inventory Management Application Demo</h2> */}
            {/* <h1 className='title' onClick={() => this.changeActiveTab(1)}>Inventory</h1> */}
            <h1 className='title'>Inventory</h1>
            <div className='app-body'>
               <Sidebar activeTab={this.state.activeTab} changeTab={this.changeActiveTab.bind(this)}/>
               <MyRouter 
                  activeTab={this.state.activeTab}
                  products={this.state.products}
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
      //       <Table productData={products} removeproduct={this.removeproduct} />
      //       <Form handleSubmit={this.handleSubmit} />
      //    </div>
      // );
   }
}

export default App;
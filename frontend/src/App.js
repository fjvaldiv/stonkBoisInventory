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
   constructor(props) {
      super(props);
      this.state = {
         products: [],
         activeTab: 1,
         newItemForm: {
            name: '',
            price: '',
            quantity: '',
            category: '',
            brand: '',
            imageURL: ''
         },
         orders: []
      };  
   }

   changeActiveTab(index) {
      this.setState({activeTab: index});
   }

   changeNewItemForm(formData){
      this.setState({newItemForm: formData});
   }

   // TODO: Needs to either call makePostCall or be combined with makePostCall
   addNewProduct(product) {
      this.makePostCall(product).then( callResult => {
         if (callResult !== false) {
            this.setState({ newItemForm: {'name' : '', 'price' : '', 'quantity' : '',
             'category' : '', 'brand' : '', 'imageURL' : ''}});
            console.log(callResult);
            this.setState({ products: [...this.state.products, callResult.data] });
            console.log(this.state.products);
         }
      });
   }

   makePostCall(product){
      return axios.post('http://localhost:5000/products', product)
         .then(function (response) {
            console.log(response);
            if (response.status === 201) {
               return response;
            }
         })
         .catch(function (error) {
            console.log(error);
            return false;
         });
   }

   removeProduct = id => {
      const { products } = this.state
    
      return axios.delete(`http://localhost:5000/products/${id}`)
        .then(response => {
          if (response.status === 204){
            this.setState({
              products: products.filter((product, i) => {
                return product._id !== id
              }),
            })
          }
      })
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
      axios.get('http://localhost:5000/orders')
       .then(res => {
         const orders = res.data.orders_list;
         this.setState({ orders });
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
                  orders={this.state.orders}
                  newItemFormData={this.state.newItemForm}
                  changeNewItemForm={this.changeNewItemForm.bind(this)}
                  addNewProduct={this.addNewProduct.bind(this)}
                  removeProduct={this.removeProduct.bind(this)}
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
import React, { Component } from 'react';
import axios from 'axios';
import './index.scss';
import MyRouter from './MyRouter';

const Sidebar = (props) => {
   return(
     <div className='Sidebar'>
       <ul>
         <li className={props.activeTab === 1 ? 'active':''} onClick={() => props.changeTab(1)}>Products</li>
         <li className={props.activeTab === 3 ? 'active':''} onClick={() => props.changeTab(3)}>Orders</li>
       </ul>
     </div>
   );
}

class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         activeTab: 1,
         filter: 'none',
         products: [],
         pSort: 'Product Name',
         orders: [],
         oSort: 'Order ID',
         newItemForm: {
            name: '',
            price: '',
            quantity: '',
            category: '',
            brand: '',
            imageURL: ''
         },
         newOrderForm: {
            products: '',
            quantity: '',
            price: '',
            status: '',
            productIDs: ''
         },
      };  
   }

   changeActiveTab(index) {
      this.setState({activeTab: index});
   }

   changeNewItemForm(formData){
      this.setState({newItemForm: formData});
   }

   changeNewOrderForm(formData){
      this.setState({newOrderForm: formData});
   }

   addNewProduct(product) {
      this.makeProductPostCall(product).then( callResult => {
         if (callResult !== false) {
            this.setState({ newItemForm: {'name' : '', 'price' : '', 'quantity' : '',
             'category' : '', 'brand' : '', 'imageURL' : ''}});
            console.log(callResult);
            this.setState({ products: [...this.state.products, callResult.data] });
            this.setSortedProducts("Product Name");
            console.log(this.state.products);
         }
      });
      this.changeActiveTab(1);
   }

   makeProductPostCall(product){
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

   addNewOrder(order) {
      this.makeOrderPostCall(order).then( callResult => {
         if (callResult !== false) {
            this.setState({ newOrderForm: {'products': '', 'quantity': '', 
               'price': '', 'status': '', 'productIDs': '', 'imageURL': ''}});
            console.log(callResult);
            this.setState({ orders: [...this.state.orders, callResult.data] });
            this.setSortedOrders("Order ID");
            console.log(this.state.orders);
         }
      });
      this.changeActiveTab(3);
      this.setSortedProducts('Product Name');
   }

   makeOrderPostCall(order) {
      return axios.post('http://localhost:5000/orders', order)
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

   removeOrder = id => {
      const { orders } = this.state
    
      return axios.delete(`http://localhost:5000/orders/${id}`)
        .then(response => {
          if (response.status === 204){
            this.setState({
              orders: orders.filter((order, i) => {
                return order._id !== id
              }),
            })
          }
      })
    }

   setSortedProducts(sortBy){
      this.setState({products: this.getSortedProducts(sortBy)});
      this.setState({pSort : sortBy})
   }

   getSortedProducts(sortBy){
      let dataToSort=this.state.products;
      dataToSort.sort((a, b) => {
         if (sortBy === 'Product Name') {
            a = a.name.toLowerCase();
            b = b.name.toLowerCase();
            if (a < b)
               return -1;
            else if (a > b)
               return 1;
            else
               return 0;
         }
         if (sortBy === 'Price')
            return a.price-b.price;
         if (sortBy === 'Quantity')
            return a.quantity-b.quantity;
         if (sortBy === 'Category') {
            a = a.category.toLowerCase();
            b = b.category.toLowerCase();
            if (a < b)
               return -1;
            else if (a > b)
               return 1;
            else
               return 0;
         }
         if (sortBy === 'Brand') {
            a = a.brand.toLowerCase();
            b = b.brand.toLowerCase();
            if (a < b)
               return -1;
            else if (a > b)
               return 1;
            else
               return 0;
         }
         if (sortBy === 'Product ID') {
            if (a._id < b._id)
               return -1;
            else if (a._id > b._id)
               return 1;
            else
               return 0;
         }
      });
      return dataToSort;
   }

   setSortedOrders(sortBy){
      this.setState({orders: this.getSortedOrders(sortBy)});
      this.setState({oSort : sortBy})
   }

   getSortedOrders(sortBy){
      let dataToSort=this.state.orders;
      dataToSort.sort((a, b) => {
         if (sortBy === 'Order ID') {
            if (a._id < b._id)
               return -1;
            else if (a._id > b._id)
               return 1;
            else
               return 0;
         }
         if (sortBy === 'Product Name') {
            a = a.products.toLowerCase();
            b = b.products.toLowerCase();
            if (a < b)
               return -1;
            else if (a > b)
               return 1;
            else
               return 0;
         }
         if (sortBy === 'Quantity')
            return a.quantity-b.quantity;
         if (sortBy === 'Price')
            return a.price-b.price;
         if (sortBy === 'Status') {
            a = a.status.toLowerCase();
            b = b.status.toLowerCase();
            if (a < b)
               return -1;
            else if (a > b)
               return 1;
            else
               return 0;
         }
         if (sortBy === 'Product ID') {
            return a.productIDs - b.productIDs;
         }
      });
      return dataToSort;
   }

   componentDidMount() {
      axios.get('http://localhost:5000/products')
       .then(res => {
         const products = res.data.products_list;
         this.setState({ products });
         this.setSortedProducts('Product Name');
       })
       .catch(function (error) {
         console.log(error);
       });
      axios.get('http://localhost:5000/orders')
       .then(res => {
         const orders = res.data.orders_list;
         this.setState({ orders });
       })
       .catch(function (error) {
         console.log(error);
       });
   }

   render () {

      return (
         <div className='App'>
            <h1 className='title'>Inventory</h1>
            <div className='app-body'>
               <Sidebar activeTab={this.state.activeTab} changeTab={this.changeActiveTab.bind(this)}/>
               <MyRouter 
                  activeTab={this.state.activeTab}
                  changeActiveTab={this.changeActiveTab.bind(this)}

                  products={this.state.products}
                  pSort={this.state.pSort}
                  newItemFormData={this.state.newItemForm}
                  changeNewItemForm={this.changeNewItemForm.bind(this)}
                  addNewProduct={this.addNewProduct.bind(this)}
                  removeProduct={this.removeProduct.bind(this)}
                  setSortedProducts={this.setSortedProducts.bind(this)}

                  orders={this.state.orders}
                  oSort={this.state.oSort}
                  newOrderFormData={this.state.newOrderForm}
                  changeNewOrderForm={this.changeNewOrderForm.bind(this)}
                  addNewOrder={this.addNewOrder.bind(this)}
                  removeOrder={this.removeOrder.bind(this)}
                  setSortedOrders={this.setSortedOrders.bind(this)}
               />
            </div>
         </div>
      );
   }
}

export default App;
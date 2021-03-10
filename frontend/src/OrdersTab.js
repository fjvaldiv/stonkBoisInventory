import React from 'react';
import './index.scss';
import './standard.css'

const OrderTableRow = (props) => {
    console.log();
    return (
      <tr>
        <td>{props.order._id}</td>
        <td>{props.order.products}</td>
        <td>{props.order.quantity}</td>
        <td>{props.order.price}</td>
        <td>{props.order.status}</td>
        <td>{props.order.productIDs}</td>
        <td><a target="_blank" href={props.order.imageURL}>View</a></td>
        <td className='editButton'>Edit</td>
        <td><button onClick={() => props.removeOrder(props.order._id)}>Delete</button></td>
      </tr>
    );
  }
  
  class OrdersTab extends React.Component {
    constructor() {
      super();
    }
    
    renderTableRows(orders){
      // const categoryKeys = Object.keys(inventory.categories);
      // const CKLength = categoryKeys.length;
      // let listOfProducts = [];
      
      // for(let i = 0; i<CKLength; i++){
      //   let category = categoryKeys[i];
      //   listOfProducts = listOfProducts.concat(inventory.categories[category]);
      // }
      
      // let LOPlength = listOfProducts.length;
      // let productsLength = products.length;s

      if (orders.length === 0){
        return <div><p>There are currently no orders in the history</p></div>
      } else {
        let rows = [
         <tr>
          <th>Order ID</th>
          <th>Product Name</th>
          <th>Quantity Ordered</th>
          <th>Total Price</th>
          <th>Status</th>
          <th>Product IDs</th>
          <th>Image</th>
        </tr>
        ];
        
        for(let i = 0; i<orders.length; i++){
          rows.push(<OrderTableRow order={orders[i]} removeOrder={this.props.removeOrder}/>);
        }
        
        return rows;
      }
    }
    
    render(){
      return(
        <div className='OrdersTab'>
          <h1>Order History</h1>
          <button onClick={() => this.props.changeActiveTab(2)} style={{float: 'right'}}>Add New Order</button>
          <p>Showing all orders:</p>
          <table className='orderTable'>
            {this.renderTableRows(this.props.orders)}
          </table>
        </div>
      );
    }
  }
 
export default OrdersTab;
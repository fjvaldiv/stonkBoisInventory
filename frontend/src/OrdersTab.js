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
      if (orders.length === 0){
        return <div><p>There are currently no orders in the history</p></div>
      } else {
        let rows = [
         <tr>
          <th onClick={() => this.props.setSortedOrders('Order ID')}>Order ID</th>
          <th onClick={() => this.props.setSortedOrders('Product Name')}>Product Name</th>
          <th onClick={() => this.props.setSortedOrders('Quantity')}>Quantity Ordered</th>
          <th onClick={() => this.props.setSortedOrders('Price')}>Total Price</th>
          <th onClick={() => this.props.setSortedOrders('Status')}>Status</th>
          <th onClick={() => this.props.setSortedOrders('Product ID')}>Product IDs</th>
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
          <p>Sorted by: <b>{this.props.oSort}</b> (Click on row header to sort)</p>
          <table className='orderTable'>
            {this.renderTableRows(this.props.orders)}
          </table>
        </div>
      );
    }
  }
 
export default OrdersTab;
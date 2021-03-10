import React from 'react';
import './index.scss';
import './standard.css'

const ProductTableRow = (props) => {
    console.log();
    return (
      <tr>
        <td>{props.product.name}</td>
        <td>${props.product.price}</td>
        <td>{props.product.quantity}</td>
        <td>{props.product.category}</td>
        <td>{props.product.brand}</td>
        <td>{props.product._id}</td>
        <td><a target="_blank" href={props.product.imageURL}>View</a></td>
        <td className='editButton'>Edit</td>
        <td><button onClick={() => props.removeProduct(props.product._id)}>Delete</button></td>
      </tr>
    );
  }
  
  class ProductsTab extends React.Component {
    constructor() {
      super();
    }
    
    renderTableRows(products){
      if (products.length === 0){
        return <div><p>There are currently no items in the inventory</p></div>
      } else {
        let rows = [
         <tr>
          <th onClick={() => this.props.setSortedProducts('Product Name')}>Product Name</th>
          <th onClick={() => this.props.setSortedProducts('Price')}>Price</th>
          <th onClick={() => this.props.setSortedProducts('Quantity')}>Quantity</th>
          <th onClick={() => this.props.setSortedProducts('Category')}>Category</th>
          <th onClick={() => this.props.setSortedProducts('Brand')}>Brand</th>
          <th onClick={() => this.props.setSortedProducts('Product ID')}>Product ID</th>
          <th>Image</th>
        </tr>
        ];
        
        for(let i = 0; i<products.length; i++){
          rows.push(<ProductTableRow product={products[i]} removeProduct={this.props.removeProduct}/>);
        }
        
        return rows;
      }
    }

    render(){
      return(
        <div className='ProductsTab'>
          <h1>Available Products List</h1>
          <button onClick={() => this.props.changeActiveTab(0)} style={{float: 'right'}}>Add New Product</button>
          <p>Showing all available products:</p>
          <p>Sorted by: <b>{this.props.pSort}</b> (Click on row header to sort)</p>
          <table className='productTable'>
            {this.renderTableRows(this.props.products)}
          </table>
        </div>
      );
    }
  }
 
export default ProductsTab;
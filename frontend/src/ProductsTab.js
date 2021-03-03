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
        <td>{props.product.description}</td>
        <td>{props.product.brand}</td>
        <td>{props.product.productID}</td>
        <td><a target="_blank" href={props.product.imageURL}>View</a></td>
        <td className='editButton'>edit</td>
      </tr>
    );
  }
  
  class ProductsTab extends React.Component {
    
    renderTableRows(products){
      // const categoryKeys = Object.keys(inventory.categories);
      // const CKLength = categoryKeys.length;
      // let listOfProducts = [];
      
      // for(let i = 0; i<CKLength; i++){
      //   let category = categoryKeys[i];
      //   listOfProducts = listOfProducts.concat(inventory.categories[category]);
      // }
      
      // let LOPlength = listOfProducts.length;
      // let productsLength = products.length;s
      if( products.length === 0){
        return <div><p>There are currently no items in the inventory</p></div>
      } else {
        let rows = [
         <tr>
          <th>Product Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Category</th>
          <th>Description</th>
          <th>Brand</th>
          <th>Product ID</th>
          <th>Image</th>
        </tr>
        ];
        
        for(let i = 0; i<products.length; i++){
          rows.push(<ProductTableRow product={products[i]}/>);
        }
        
        return rows;
      }
    }
    
    render(){
      return(
        <div className='ProductsTab'>
          <h1>Available Products List
            <button style={{float: 'right'}}>Add New Product</button>
          </h1>
          <p>Showing all available products:</p>
          <table className='productTable'>
            {this.renderTableRows(this.props.products)}
          </table>
        </div>
      );
    }
  }
 
export default ProductsTab;
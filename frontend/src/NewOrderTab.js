import React from 'react';
import './index.scss';

class NewOrderTab extends React.Component {
    constructor() {
      super();
      this.state = {
        formErrors: {
          products: false,
          quantity: false,
          price: false,
          status: false,
          productIDs: false,
        }
      }
    }
    
    checkForm(){
      let products = document.getElementById('newOrderForm-products').value;
      let quantity = document.getElementById('newOrderForm-quantity').value;
      let price = document.getElementById('newOrderForm-price').value;
      let status = document.getElementById('newOrderForm-status').value;
      let productIDs = document.getElementById('newOrderForm-productIDs').value;
      let errors = this.state.formErrors;
      products.length === 0 ? errors.products = true : errors.products = false;
      quantity.length === 0 ? errors.quantity = true : errors.quantity = false;
      price.length === 0 ? errors.price = true : errors.price = false;
      status.length === 0 ? errors.status = true : errors.status = false;
      productIDs.length === 0 ? errors.productIDs = true : errors.productIDs = false;
      
      this.props.addNewOrder(this.props.formData);
      this.setState({formErrors: errors});
    }
    
    updateForm(){
      let products = document.getElementById('newOrderForm-products').value;
      let quantity = document.getElementById('newOrderForm-quantity').value;
      let price = document.getElementById('newOrderForm-price').value;
      let status = document.getElementById('newOrderForm-status').value;
      let productIDs = document.getElementById('newOrderForm-productIDs').value;
      let errors = this.state.formErrors;
      if(this.props.formData.products !== products){
        errors.products = false;
      }
      if(this.props.formData.quantity !== quantity){
        errors.quantity = false;
      }
      if(this.props.formData.price !== price){
        errors.price = false;
      }
      if(this.props.formData.status !== status){
        errors.status = false;
      }
      if(this.props.formData.productIDs !== productIDs){
        errors.productIDs = false;
      }
      this.setState({formErrors: errors});
      
      this.props.changeNewOrderForm({products: products, name: products, quantity: quantity, price: price,
        status: status, productIDs: productIDs});
    }
    
    render(){
      return(
        <div className='NewItemTab'>
          <div className='newItem-input'>
            <h1>Add a New Order</h1>
            <p>
              <label>Products Ordered</label>
              <input className={this.state.formErrors.products === true ? 'formCheck-err' : ''} type='text' required id='newOrderForm-products' value={this.props.formData.products} onChange={() => this.updateForm()}></input>
            </p>
            <p>
              <label>Quantity Ordered</label>
              <input className={this.state.formErrors.price === true ? 'formCheck-err' : ''} type='number' required id='newOrderForm-quantity' value={this.props.formData.quantity} onChange={() => this.updateForm()}></input>
            </p>
            <p>
              <label>Total Price</label>
              <input className={this.state.formErrors.price === true ? 'formCheck-err' : ''} type='number' required id='newOrderForm-price' value={this.props.formData.price} onChange={() => this.updateForm()}></input>
            </p>
            <p>
              <label>Status</label>
              <input className={this.state.formErrors.status === true ? 'formCheck-err' : ''} type='text' required id='newOrderForm-status' value={this.props.formData.status} onChange={() => this.updateForm()}></input>
            </p>
            <p>
              <label>Product IDs</label>
              <input className={this.state.formErrors.productIDs === true ? 'formCheck-err' : ''} type='text' required id='newOrderForm-productIDs' value={this.props.formData.productIDs} onChange={() => this.updateForm()}></input>
            </p>
            <button onClick={() => this.checkForm()}>Add Order</button>
          </div>
        </div>
      );
    }
  }

export default NewOrderTab;

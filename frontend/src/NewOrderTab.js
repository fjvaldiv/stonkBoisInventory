import React from 'react';
import ProductCard from './ProductCard';
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
          imageURL: false
        }
      }
    }
    
    checkForm(){
      let products = document.getElementById('newOrderForm-products').value;
      let quantity = document.getElementById('newOrderForm-quantity').value;
      let price = document.getElementById('newOrderForm-price').value;
      let status = document.getElementById('newOrderForm-status').value;
      let productIDs = document.getElementById('newOrderForm-productIDs').value;
      let imageURL = document.getElementById('newOrderForm-imageURL').value;
      let errors = this.state.formErrors;
      products.length === 0 ? errors.products = true : errors.products = false;
      quantity.length === 0 ? errors.quantity = true : errors.quantity = false;
      price.length === 0 ? errors.price = true : errors.price = false;
      status.length === 0 ? errors.status = true : errors.status = false;
      productIDs.length === 0 ? errors.productIDs = true : errors.productIDs = false;
      
      let image = new Image();
      image.onerror = () =>{
        // this.finalizeForm(false, product);
        this.finalizeForm(false, this.props.formData);
      }
      image.onload = () =>{
        // this.finalizeForm(true, product);
        this.finalizeForm(true, this.props.formData);
      }
      this.setState({formErrors: errors});
      image.src = imageURL;
    }
    
    finalizeForm(isImageURLValid, order){
      
      if(isImageURLValid === false){
        let errors = this.state.formErrors;
        errors.imageURL = true;
        this.setState({formErrors: errors});
      } else {
        // TODO: implement some sort of post call inside addNewProduct, 
        //       or combine addNewProduct with makePostCall
        this.props.addNewOrder(order);
      }
    }
    
    updateForm(){
      let products = document.getElementById('newOrderForm-products').value;
      let quantity = document.getElementById('newOrderForm-quantity').value;
      let price = document.getElementById('newOrderForm-price').value;
      let status = document.getElementById('newOrderForm-status').value;
      let productIDs = document.getElementById('newOrderForm-productIDs').value;
      let imageURL = document.getElementById('newOrderForm-imageURL').value;
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
      if(this.props.formData.imageURL !== imageURL){
        errors.imageURL= false;
      }
      this.setState({formErrors: errors});
      
      this.props.changeNewOrderForm({products: products, name: products, quantity: quantity, price: price,
        status: status, productIDs: productIDs, imageURL: imageURL});
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
            <p>
              <label>Image URL</label>
              <input className={this.state.formErrors.imageURL === true ? 'formCheck-err' : ''} type='text' required id='newOrderForm-imageURL' value={this.props.formData.imageURL} onChange={() => this.updateForm()} placeholder='Paste link here'></input>
            </p>
            <button onClick={() => this.checkForm()}>Add Order</button>
          </div>
          <div className='newItem-preview'>
            <h1>Preview</h1>
            <ProductCard product={this.props.formData} />
            
          </div>

        </div>
      );
    }
  }

export default NewOrderTab;

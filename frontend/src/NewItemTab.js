import React from 'react';
import ProductCard from './ProductCard';
import './index.scss';

class NewItemTab extends React.Component {
    constructor() {
      super();
      this.state = {
        formErrors: {
          name: false,
          price: false,
          quantity: false,
          category: false,
          brand: false,
          imageURL: false
        }
      }
    }
    
    checkForm(){
      let name = document.getElementById('newItemForm-name').value;
      let price = document.getElementById('newItemForm-price').value;
      let quantity = document.getElementById('newItemForm-quantity').value;
      let category = document.getElementById('newItemForm-category').value;
      let brand = document.getElementById('newItemForm-brand').value;
      let imageURL = document.getElementById('newItemForm-imageURL').value;
      let errors = this.state.formErrors;
      name.length === 0 ? errors.name = true : errors.name = false;
      price.length === 0 ? errors.price = true : errors.price = false;
      quantity.length === 0 ? errors.quantity = true : errors.quantity = false;
      category.length === 0 ? errors.category = true : errors.category = false;
      brand.length === 0 ? errors.brand = true : errors.brand = false;
      
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
    
    finalizeForm(isImageURLValid, product){
      
      if(isImageURLValid === false){
        let errors = this.state.formErrors;
        errors.imageURL = true;
        this.setState({formErrors: errors});
      } else {
        // TODO: implement some sort of post call inside addNewProduct, 
        //       or combine addNewProduct with makePostCall
        this.props.addNewProduct(product);
      }
    }
    
    updateForm(){
      let name = document.getElementById('newItemForm-name').value;
      let price = document.getElementById('newItemForm-price').value;
      let quantity = document.getElementById('newItemForm-quantity').value;
      let category = document.getElementById('newItemForm-category').value;
      let brand = document.getElementById('newItemForm-brand').value;
      let imageURL = document.getElementById('newItemForm-imageURL').value;
      let errors = this.state.formErrors;
      if(this.props.formData.name !== name){
        errors.name = false;
      }
      if(this.props.formData.price !== price){
        errors.price = false;
      }
      if(this.props.formData.quantity !== quantity){
        errors.quantity = false;
      }
      if(this.props.formData.category !== category){
        errors.category = false;
      }
      if(this.props.formData.brand !== brand){
        errors.brand = false;
      }
      if(this.props.formData.imageURL !== imageURL){
        errors.imageURL= false;
      }
      this.setState({formErrors: errors});
      
      this.props.changeNewItemForm({name: name, price: price, quantity: quantity,
        category: category, imageURL: imageURL});
    }
    
    render(){
      return(
        <div className='NewItemTab'>
          <div className='newItem-input'>
            <h1>Add a New Product</h1>
            <p>
              <label>Product Name</label>
              <input className={this.state.formErrors.name === true ? 'formCheck-err' : ''} type='text' required id='newItemForm-name' value={this.props.formData.name} onChange={() => this.updateForm()}></input>
            </p>
            <p>
              <label>Price</label>
              <input className={this.state.formErrors.price === true ? 'formCheck-err' : ''} type='number' required id='newItemForm-price' value={this.props.formData.price} onChange={() => this.updateForm()}></input>
            </p>
            <p>
              <label>Quantity</label>
              <input className={this.state.formErrors.price === true ? 'formCheck-err' : ''} type='number' required id='newItemForm-quantity' value={this.props.formData.quantity} onChange={() => this.updateForm()}></input>
            </p>
            <p>
              <label>Category</label>
              <input className={this.state.formErrors.category === true ? 'formCheck-err' : ''} type='text' required id='newItemForm-category' value={this.props.formData.category} onChange={() => this.updateForm()}></input>
            </p>
            <p>
              <label>Brand</label>
              <input className={this.state.formErrors.brand === true ? 'formCheck-err' : ''} type='text' required id='newItemForm-brand' value={this.props.formData.brand} onChange={() => this.updateForm()}></input>
            </p>
            <p>
              <label>Image URL</label>
              <input className={this.state.formErrors.imageURL === true ? 'formCheck-err' : ''} type='text' required id='newItemForm-imageURL' value={this.props.formData.imageURL} onChange={() => this.updateForm()} placeholder='Paste link here'></input>
            </p>
            <button onClick={() => this.checkForm()}>Add Product</button>
          </div>
          <div className='newItem-preview'>
            <h1>Preview</h1>
            <ProductCard product={this.props.formData} />
            
          </div>

        </div>
      );
    }
  }

export default NewItemTab;

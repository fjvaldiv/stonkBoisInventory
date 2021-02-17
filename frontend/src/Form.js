import React, { Component } from 'react';

class Form extends Component {
   initialState = {
      name: '',
      price: '',
      quantity: '',
      category: '',
      description: '',
      brand: '',
      productID: '',
      picture: '',
    };

   state = this.initialState;

   handleChange = event => {
      const { name, value } = event.target
    
      this.setState({
         [name]: value,
      })
   }

   submitForm = () => {
      this.props.handleSubmit(this.state)
      this.setState(this.initialState)
   }

   render() {
      const { name, price, quantity, category, description, brand, productID, picture } = this.state;
    
      return (
        <form>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={this.handleChange} />
  
          <label htmlFor="price">Price</label>
          <input
            type="text"
            name="price"
            id="price"
            value={price}
            onChange={this.handleChange} />
  
          <label htmlFor="quantity">Quantity</label>
          <input
            type="text"
            name="quantity"
            id="quantity"
            value={quantity}
            onChange={this.handleChange} />
  
          <label htmlFor="category">Category</label>
          <input
            type="text"
            name="category"
            id="category"
            value={category}
            onChange={this.handleChange} />
  
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={this.handleChange} />
  
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            name="brand"
            id="brand"
            value={brand}
            onChange={this.handleChange} />
  
          <label htmlFor="productID">ProductID</label>
          <input
            type="text"
            name="productID"
            id="productID"
            value={productID}
            onChange={this.handleChange} />
  
          <label htmlFor="picture">Picture</label>
          <input
            type="text"
            name="picture"
            id="picture"
            value={picture}
            onChange={this.handleChange} />
  
          <input type="button" value="Submit" onClick={this.submitForm} />
        </form>
      );
    }
}

export default Form;
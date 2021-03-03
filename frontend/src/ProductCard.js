import React from 'react';
import './index.scss';

class ProductCard extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        name: props.product.name,
        price: props.product.price,
        quantity: props.product.quantity,
        category: props.product.category,
        brand: props.product.brand,
        imageURL: 'http://via.placeholder.com/200x200',
        checkURL: props.product.imageURL,
      }
      this.checkImage.bind(this);
      this.checkImage();
    }
    
    componentWillReceiveProps(nextProps){
      if(nextProps.product.name !== this.state.name){
        this.setState({name: nextProps.product.name});
      }
      if(nextProps.product.price !== this.state.price){
        this.setState({price: nextProps.product.price});
      }
      if(nextProps.product.quantity !== this.state.quantity){
        this.setState({quantity: nextProps.product.quantity});
      }
      if(nextProps.product.category !== this.state.category){
        this.setState({category: nextProps.product.category});
      }
      if(nextProps.product.brand !== this.state.brand){
        this.setState({brand: nextProps.product.brand});
      }
      if(nextProps.product.imageURL !== this.state.imageURL){
        this.setState({checkURL: nextProps.product.imageURL}, () => this.checkImage());
      }
    }
  
    checkImage(){
      let image = new Image();
      image.onerror = () =>{
        this.setState({imageURL: 'http://via.placeholder.com/200x200'});
      }
      image.onload = () =>{
        this.setState({imageURL: this.state.checkURL});
      }
      image.src = this.state.checkURL;
    }
    
    render(){
      return(
        <div className = 'ProductCard'>
          <p className='category'>Products &#187; {this.state.category}</p>
          <p className='name'>{this.state.name}</p>
          <img src={this.state.imageURL}></img>
          <p className='price'>from <span>${this.state.price}</span></p>
        </div>
      );
    }
  } 

export default ProductCard;

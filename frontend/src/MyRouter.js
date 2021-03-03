import React from 'react';
import NewItemTab from './NewItemTab';
import ProductsTab from './ProductsTab';
import OrdersTab from './OrdersTab';
import './index.scss';

class MyRouter extends React.Component {
   
    route(active){
      switch(active){
        case 0:
          return <NewItemTab 
                   products={this.props.products}
                   formData={this.props.newItemFormData}
                   changeNewItemForm={this.props.changeNewItemForm}
                   addNewProduct={this.props.addNewProduct}
                   />
        case 1:
          return <ProductsTab products={this.props.products} removeProduct={this.props.removeProduct}/>;
        case 3:
          return <OrdersTab orders={this.props.orders} removeOrder={this.props.removeOrder}/>;
        default:
            break;
      }
    }
    
    render(){
      return(
        <div className='MyRouter'>
          {this.route(this.props.activeTab)}
        </div>
      );
    }
  }

export default MyRouter;
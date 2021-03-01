import React from 'react';
import NewItemTab from './NewItemTab';
import ProductsTab from './ProductsTab';
import './index.scss';

class MyRouter extends React.Component {
   
    route(active){
      switch(active){
        case 0:
          return <NewItemTab 
                   inventory={this.props.inventory}
                   formData={this.props.newItemFormData}
                   changeForm={this.props.changeNewItemForm}
                   addNewProduct={this.props.addNewProduct}
                   />
        case 1:
          return <ProductsTab inventory={this.props.inventory}/>;
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
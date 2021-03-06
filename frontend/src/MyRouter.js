import React from 'react';
import NewItemTab from './NewItemTab';
import ProductsTab from './ProductsTab';
import NewOrderTab from './NewOrderTab';
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
          return <ProductsTab products={this.props.products} removeProduct={this.props.removeProduct}
                    changeActiveTab={this.props.changeActiveTab} setSortedProducts={this.props.setSortedProducts}
                    pSort={this.props.pSort}/>;
        case 2:
          return <NewOrderTab 
                    orders={this.props.orders}
                    formData={this.props.newOrderFormData}
                    changeNewOrderForm={this.props.changeNewOrderForm}
                    addNewOrder={this.props.addNewOrder}
                    />
        case 3:
          return <OrdersTab orders={this.props.orders} removeOrder={this.props.removeOrder}
                    changeActiveTab={this.props.changeActiveTab} setSortedOrders={this.props.setSortedOrders}
                    oSort={this.props.oSort}/>;
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
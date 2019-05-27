import React, { Component } from "react";
import "./dashboard.css";
import axios from "axios";
import { Product } from './../Product/Product'


export default class Dashboard extends Component {
  deleter = (id) => {
    axios.delete(`/api/${id}`).then(deleted => {
      this.props.refresh();
    });
  }

  render() {
    // console.log('[dashboard]', this.props)
    let inventory = this.props.inventory ? this.props.inventory.sort((a,b) => a.id-b.id).map( product => 
      <Product 
        key={product.id}
        product={product}
        edit={this.props.edit}
        deleter={this.deleter}/> ) : null
    return (
      <div className="dashboard">
        {inventory}
      </div>
    );
  }
}

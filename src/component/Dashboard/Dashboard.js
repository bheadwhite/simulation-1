import React, { Component } from "react";
import Product from "./../Product/Product";
import "./dashboard.css";
import axios from "axios";
import {Link} from 'react-router-dom'

export default class Dashboard extends Component {
  deleter(d) {
    let that = this;
    axios.delete(`/api/${d}`).then(deleted => {
      that.props.refresh();
    });
  }
  render() {
    return (
      <div className="dashboard">
        {this.props.inventory.map((product, i) => {
          return (
            <div className="Product" key={i}>
              <div className="product_pic">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product_d">
                <p className="product_d_name">{product.name}</p>
                <p className="product_d_price">${product.price}</p>
                <div className="product_d_buttons">
                  <button
                    onClick={() => {
                      this.deleter(product.id);
                    }}
                  >
                    Delete
                  </button>
                  <Link to="/form/edit"><button onClick={()=>this.props.edit(product)}>Edit</button></Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

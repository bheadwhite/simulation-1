import React, { Component } from 'react';
import Product from './../Product/Product'
import './dashboard.css';
import axios from 'axios'

export default class Dashboard extends Component {
    deleter(d){
        let that = this
        axios.delete(`/api/${d}`).then(deleted => {
            that.props.refresh();
        })
    }
    render(){
        return (
            <div className="dashboard">
                {
                    this.props.inventory.map((product, i) => {
                        return (
                            <div className='Product' key={i}>
                                <img className="product_pic" src={product.url} alt={product.name} />
                                <div className='product_box'>
                                    <p className="product_name">{product.name}</p>
                                    <p className="product_price">${product.price}</p>
                                    <button onClick={()=>{this.deleter(i)}}>delete</button>
                                    <button>edit</button>
                                </div>
                            </div>
                        )
                    })
                }
                <Product />
            </div>
        )
    }
}
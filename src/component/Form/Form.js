import React, { Component } from "react";
import "./form.css";
import axios from "axios";

export default class Form extends Component {
  constructor() {
    super();
    this.state = {
      img: "",
      productName: "",
      price: 0,
      bckgrndimg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQOyYpYBhnNhfU5ONu6wXoQO3m6gDsbtVRICthpUJ5sp5XOnzt"
    };
  }

  add() {
    let that = this;
    let obj = {
      img: this.state.img,
      productName: this.state.productName,
      price: this.state.price
    };
    axios
      .post("http://localhost:3001/api/product", obj)
      .then(res => {
        that.props.refresh();
        that.reset();
      })
      .catch(err => console.log(err));
  }

  reset() {
    this.setState({
      img: "",
      productName: "",
      price: 0,
      bckgrndimg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQOyYpYBhnNhfU5ONu6wXoQO3m6gDsbtVRICthpUJ5sp5XOnzt"
    });
  }
  render() {
    return (
      <div className="Form">
        <div className="form_img_preview">
          <img src={this.state.bckgrndimg} alt={this.state.productName} />
        </div>
        <p>Image URL:</p>
        <input
          type="text"
          onChange={e => {
            this.setState({ img: e.target.value, bckgrndimg: e.target.value });
          }}
          value={this.state.img}
        />
        <p>Product Name:</p>
        <input
          type="text"
          onChange={e => {
            this.setState({ productName: e.target.value });
          }}
          value={this.state.productName}
        />
        <p>Price:</p>
        <input
          type="text"
          onChange={e => {
            this.setState({ price: e.target.value });
          }}
          value={this.state.price}
        />
        <div className="form_button_box">
          <button
            onClick={() => {
              this.reset();
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              this.add();
            }}
          >
            Add to Inventory
          </button>
        </div>
      </div>
    );
  }
}

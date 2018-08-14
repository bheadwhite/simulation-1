import React, { Component } from "react";
import "./form.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Form extends Component {
  constructor() {
    super();
    this.state = {
      item: {}
    };
  }

  add() {
    let that = this;
    let obj = {
      image: this.state.item.image,
      name: this.state.item.name,
      price: this.state.item.price,
      imgAddress: this.state.item.imgAddress
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
      item: {
        imgAddress: "",
        img: "",
        name: "",
        price: 0,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQOyYpYBhnNhfU5ONu6wXoQO3m6gDsbtVRICthpUJ5sp5XOnzt"
      }
    });
  }
  update() {
    axios.put("/api/product", this.state.item);
    this.setState({ edit: false });
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(nextProps);
    if (nextProps.itemToEdit !== prevState) {
      return {
        item: {
          imgAddress: nextProps.itemToEdit.imgaddress,
          image: nextProps.itemToEdit.image,
          name: nextProps.itemToEdit.name,
          price: nextProps.itemToEdit.price
        }
      };
    }
  }
  render() {
    return (
      <div className="Form">
        <div className="form_img_preview">
          <img src={this.state.item.image} alt="pic" />
        </div>
        <p>Image URL:</p>
        <input
          type="text"
          onChange={e => {
            this.setState({
              item: {
                imgAddress: e.target.value,
                image: e.target.value,
                name: this.state.item.name,
                price: this.state.item.price
              }
            });
          }}
          value={this.state.item.imgAddress}
        />
        <p>Product Name:</p>
        <input
          type="text"
          onChange={e => {
            this.setState({
              item: {
                imgAddress: this.state.item.imgAddress,
                image: this.state.item.image,
                name: e.target.value,
                price: this.state.item.price
              }
            });
          }}
          value={this.state.item.name}
        />
        <p>Price:</p>
        <input
          type="text"
          onChange={e => {
            this.setState({
              item: {
                imgAddress: this.state.item.imgAddress,
                image: this.state.item.image,
                name: this.state.item.name,
                price: e.target.value
              }
            });
          }}
          value={this.state.item.price}
        />
        <div className="form_button_box">
          <Link to="/">
            <button onClick={() => this.props.blankForm()}>Cancel</button>
          </Link>
          {this.state.edit ? (
            <Link to="/">
              <button
                onClick={() => {
                  this.update();
                }}
              >
                {" "}
                Save Changes
              </button>
            </Link>
          ) : (
            <Link to="/">
              <button
                onClick={() => {
                  this.add();
                }}
              >
                Add to Inventory
              </button>
            </Link>
          )}
        </div>
      </div>
    );
  }
}

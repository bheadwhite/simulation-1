import React, { Component } from "react";
import "./form.css";
import { Link, withRouter } from "react-router-dom";


class Form extends Component {
  state = {
    item: {
      image: "",
      name: "",
      price: 0
    },
    edit: false
  };

  componentDidMount(){
    console.log('[form]', this.props)
  }

  addItem = () => {
    this.props.history.push('/')
    this.props.addItem(this.state.item)
  }

  resetItem = () => {
    this.setState({
      item: {
        image: "",
        name: "",
        price: 0,
        edit: false
      }
    });
  }

  // updateItem = () => {
  //   axios.put("/api/product", {...this.state.item});
  //   // this.setState({ edit: false });
  // }

  itemInputHandler = (e) => {
    this.setState({
      item: {
        ...this.state.item,
        [e.target.name]: e.target.value
      }
    })
  }

  render() {
    return (
      <div className="Form">
        <div className="form_img_preview">
          <img src={this.state.item.image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQOyYpYBhnNhfU5ONu6wXoQO3m6gDsbtVRICthpUJ5sp5XOnzt'} alt="preview" />
        </div>
        <p>Image URL:</p>
        <input
          type="text"
          name="image"
          onChange={this.itemInputHandler}
          value={this.state.item.image}
        />
        <p>Product Name:</p>
        <input
          type="text"
          name="name"
          onChange={this.itemInputHandler}
          value={this.state.item.name}/>
        <p>Price:</p>
        <input
          type="text"
          name="price"
          onChange={this.itemInputHandler}
          value={this.state.item.price}/>
        <div className="form_button_box">
          <Link to="/" onClick={this.props.cancel}><button>Cancel</button></Link>
          {this.state.edit ? ( 
            <button onClick={this.updateItem}>Save Changes</button>) : ( 
            <button onClick={this.addItem}>Add to Inventory</button> )}
        </div>
      </div>
    );
  }
}

export default withRouter(Form)
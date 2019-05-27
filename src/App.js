import React, { Component } from "react";
import "./App.css";
import Dashboard from "./component/Dashboard/Dashboard";
import Form from "./component/Form/Form";
import Header from "./component/Header/Header";
import axios from "axios";
import { Route, withRouter } from "react-router-dom";

class App extends Component {
  state = {
    inventory: [],
    edit: false,
    editItem: {}
  };

  
  componentDidUpdate(){
    if(this.state.edit === true){
      this.setState({edit: false})
    }
  }
  componentDidMount() {
    this.update();
  }
  update() {
    axios.get("http://localhost:3001/api/inventory").then(res => {
      this.setState({ inventory: res.data, edit: false });
    });
  }
  
  addItem = (item) => {
    axios.post("http://localhost:3001/api/product", item)
    .then(res => {
      this.setState({
        inventory: res.data
      })
    })
    .catch(err => console.log(err));
  }

  editItem = (id) => {
    let itemToEdit = this.state.inventory.filter(el => el.id === id)
    this.setState({
      editItem: itemToEdit[0],
      edit: true
    })

    this.props.history.push(`/form`)
  }
  
  render() {
    console.log('[app.js]', this.state.inventory)
    return (
      <div className="App">
        <Header blankForm={this.updateBlankForm} />
        <div className="body">
          <Route
            exact
            path="/"
            render={props => (
              <Dashboard
                inventory={this.state.inventory}
                refresh={() => this.update()}
                edit={this.editItem} /> )} />
          <Route
            exact path="/form"
            render={props => (
              <Form 
                edit={this.state.edit}
                cancel={this.cancel}
                addItem={this.addItem}
                editItem={this.state.editItem}
                />)} />
        </div>
      </div>
    );
  }
}

export default withRouter(App);

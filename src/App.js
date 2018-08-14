import React, { Component } from "react";
import "./App.css";
import Dashboard from "./component/Dashboard/Dashboard";
import Form from "./component/Form/Form";
import Header from "./component/Header/Header";
import axios from "axios";
import { Route } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      inventory: [],
      edit: false,
      editForm: {},
      blankForm: {
        imgAddress: "",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQOyYpYBhnNhfU5ONu6wXoQO3m6gDsbtVRICthpUJ5sp5XOnzt",
        name: "",
        price: ""
      }
    };
  }
  updateBlankForm = () => {
    this.setState({
      edit: false
    });
  };
  updateEditForm = obj => {
    this.setState({
      editForm: obj,
      edit: true
    });
  };
  componentDidMount() {
    this.update();
  }
  update() {
    axios.get("http://localhost:3001/api/inventory").then(res => {
      this.setState({ inventory: res.data });
    });
    this.setState({ edit: false });
  }

  render() {
    let form = this.state.edit ? this.state.editForm : this.state.blankForm;
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
                edit={this.updateEditForm}
              />
            )}
          />
          <Route
            exact path="/form"
            render={props => (
              <Form refresh={() => this.update()} itemToEdit={form} blankForm={this.updateBlankForm} />
            )}
          />
          <Route
            exact path="/form/edit"
            render={props => (
              <Form refresh={() => this.update()} itemToEdit={form} blankForm={this.updateBlankForm} />
            )}
          />
        </div>
      </div>
    );
  }
}

export default App;

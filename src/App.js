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
  };

  editItem = (id) => {
    this.setState({
      edit: true
    })
    this.props.history.push('/form')
  }

  componentDidMount() {
    this.update();
  }

  componentDidUpdate(){
    console.log(this.props)
    // this.update()
  }

  update() {
    axios.get("http://localhost:3001/api/inventory").then(res => {
      this.setState({ inventory: res.data });
    });
    this.setState({ edit: false });
  }

  render() {
    console.log('[app.js]', this.state)
    // let form = this.state.edit ? this.state.editForm : this.state.blankForm;
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
                />)} />
          {/* <Route
            exact path="/form/edit"
            render={props => (
              <Form 
                refresh={() => this.update()} 
                // itemToEdit={form} 
                // blankForm={this.updateBlankForm} 
                edit={this.state.edit}/> )} /> */}
        </div>
      </div>
    );
  }
}

export default withRouter(App);

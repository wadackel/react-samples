"use strict";

import React, {Component} from "react"
import {connect} from "react-redux"
import Helmet from "react-helmet"
import {Link} from "react-router"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {message: "loading..."};
  }

  componentDidMount() {
    this.setState({message: "done"});
  }

  renderLoginButton() {
    if (!this.props.auth.authenticated) {
      return (<a href="/auth/login">Login</a>);
    } else {
      return (<a href="/auth/logout">Logout</a>);
    }
  }

  render() {
    return (
      <div>
        <Helmet
          title="HOME"
          titleTemplate="%s - react-ssr sample"
          meta={[
            {name: "description", content: "home"}
          ]}
        />
        <h1>Hello SSR!!</h1>
        <p>{this.state.message}</p>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about/">About</Link></li>
          <li><Link to="/list/">List</Link></li>
          <li>{this.renderLoginButton()}</li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}

export default connect(
  state => state
)(App);

"use strict";

import React, {Component} from "react"
import Helmet from "react-helmet"
import {Link} from "react-router"

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {message: "loading..."};
  }

  componentDidMount() {
    this.setState({message: "done"});
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
          <li><a href="/auth/login">Login</a></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}

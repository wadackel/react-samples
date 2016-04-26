"use strict";

import React, {Component} from "react"
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
        <h1>Hello SSR!!</h1>
        <p>{this.state.message}</p>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about/">About</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}

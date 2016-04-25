"use strict";

import React, {Component} from "react"

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
        {this.props.children}
      </div>
    );
  }
}

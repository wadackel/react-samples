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
    const list = this.props.data.map(obj => <li key={obj.id}>{obj.id}: {obj.name}</li>);

    return (
      <div>
        <h1>Hello SSR!!</h1>
        <p>{this.state.message}</p>
        <ul>{list}</ul>
      </div>
    );
  }
}

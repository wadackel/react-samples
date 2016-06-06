import React, { Component } from "react";

export default class Button extends Component {
  render() {
    return (
      <div>
        <button className="button">{this.props.children}</button>
      </div>
    );
  }
}

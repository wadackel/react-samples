import React, { Component } from "react";
import ImageEditor from "./image-editor";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <ImageEditor width="500" height="500" image="./images/screenshot.png" />;
  }
}

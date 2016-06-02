import React, { Component } from "react";

export default class ImageEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { width, height, image } = this.props;
    const { canvas } = this.refs;
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.addEventListener("load", () => {
      ctx.drawImage(img, 0, 0);
    }, false);

    img.src = image;
  }

  render() {
    const { width, height } = this.props;
    return <canvas ref="canvas" width={width} height={height}></canvas>;
  }
}

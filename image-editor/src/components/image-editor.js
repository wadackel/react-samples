import React, { Component } from "react";

function bindHandlerHelper(handlers, instance) {
  handlers.forEach(handler => {
    instance[handler] = instance[handler].bind(instance);
  });
}

export default class ImageEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    bindHandlerHelper([
      "handleImageLoaded"
    ], this);
  }

  componentDidMount() {
    const { image } = this.props;
    const { canvas } = this.refs;
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.addEventListener("load", this.handleImageLoaded);
    img.src = image;

    this.ctx = ctx;
    this.img = img;
  }

  handleImageLoaded(e) {
    const { width, height } = this.props;
    const { width: imgW, height: imgH } = this.img;

    const size = this.normalizeSize(width, height, imgW, imgH);

    this.ctx.drawImage(
      this.img,
      width / 2 - size.width / 2,
      height / 2 - size.height / 2,
      size.width,
      size.height
    );
  }

  normalizeSize(sw, sh, dw, dh) {
    let width;
    let height;

    if (dw > dh) {
      width = Math.min(sw, dw);
      height = dh * (width / dw);

    } else if (dw < dh) {
      height = Math.min(sh, dh);
      width = dw * (height / dh);

    } else {
      width = Math.min(sw, dw);
      height = Math.min(sh, sh);
    }

    return {width, height};
  }

  render() {
    const { width, height } = this.props;
    return <canvas ref="canvas" width={width} height={height}></canvas>;
  }
}

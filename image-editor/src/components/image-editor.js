import React, { Component } from "react";
import bindHandlerHelper from "../utils/bind-handler-helper";

export default class ImageEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: {
        top: 0,
        left: 0,
        width: 0,
        height: 0
      }
    };

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

  componentDidUpdate() {
    this.renderImage();
  }

  handleImageLoaded() {
    this.renderImage();
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

  clearImage() {
    const { width, height } = this.props;
    const { image } = this.state;

    this.ctx.clearRect(
      Math.max(0, Math.min(image.left, width)),
      Math.max(0, Math.min(image.top, height)),
      image.width,
      image.height
    );
  }

  renderImage() {
    const { width, height } = this.props;
    const { width: imgW, height: imgH } = this.img;

    const size = this.normalizeSize(width, height, imgW, imgH);

    const { image } = this.state;
    image.top = height / 2 - size.height / 2;
    image.left = width / 2 - size.width / 2;
    image.width = size.width;
    image.height = size.height;
    this.state.image = image;

    this.ctx.drawImage(
      this.img,
      image.left,
      image.top,
      image.width,
      image.height
    );
  }

  render() {
    const { width, height, style } = this.props;
    return <canvas ref="canvas" width={width} height={height} style={style} />;
  }
}

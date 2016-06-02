import React, { Component } from "react";
import IScroll from "iscroll";
import bindHandlerHelper from "../utils/bind-handler-helper";

export default class ImageViewer extends Component {
  static defaultProps = {
    className: "image-viewer",
    style: {
      overflow: "hidden"
    },
    iScrollOptions: {
      bounce: true,
      click: true,
      freeScroll: true,
      scrollX: true,
      scrollY: true,
      mouseWheel: true,
      scrollbars: true
    },
  };

  constructor(props) {
    super(props);
    this.state = {};

    bindHandlerHelper([
      "handleImageLoaded"
    ], this);
  }

  componentDidMount() {
    const { iScrollOptions } = this.props;
    const { iScroll, image } = this.refs;

    this.iScroll = new IScroll(iScroll, iScrollOptions);

    image.addEventListener("load", this.handleImageLoaded, false);
  }

  componentDidUpdate() {
    this.refresh();
  }

  componentWillUnmount() {
    this.iScroll.destroy();
    this.iScroll = null;
  }

  handleImageLoaded(e) {
    this.refresh();
  }

  refresh() {
    this.iScroll.refresh();
  }

  render() {
    const { image, style, className } = this.props;

    return (
      <div ref="iScroll" className={className} style={style}>
        <img ref="image" src={image} />
      </div>
    );
  }
}

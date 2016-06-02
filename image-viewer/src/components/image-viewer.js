import React, { Component } from "react";
import IScroll from "iscroll";
import bindHandlerHelper from "../utils/bind-handler-helper";

export default class ImageViewer extends Component {
  static defaultProps = {
    className: "image-viewer",
    style: {
      overflow: "hidden"
    },
    zoom: 0.5,
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

    this.state = {
      naturalWidth: 0,
      naturalHeight: 0
    };

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.zoom !== this.props.zoom) {
      this.updateImageSize();
    }
  }

  handleImageLoaded(e) {
    const { width, height } = this.refs.image;

    this.setState({naturalWidth: width, naturalHeight: height});
    this.updateImageSize();

    this.refresh();
  }

  updateImageSize() {
    const { zoom } = this.props;
    const { naturalWidth, naturalHeight } = this.state;
    const { image } = this.refs;

    image.width = naturalWidth * zoom;
    image.height = naturalHeight * zoom;

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

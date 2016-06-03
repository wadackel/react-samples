import React, { Component } from "react";
import IScroll from "iscroll";

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
      width: 0,
      height: 0,
      naturalWidth: 0,
      naturalHeight: 0
    };
  }

  componentDidMount() {
    const { iScrollOptions } = this.props;
    const { iScroll, image } = this.refs;

    this.iScroll = new IScroll(iScroll, iScrollOptions);
    this.updateImageSize();
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

  getImageSize() {
    return new Promise((resolve, reject) => {
      const { image } = this.refs;
      const { width, height, naturalWidth, naturalHeight } = image;

      if (width !== 0 || height !== 0 || naturalWidth !== 0 || naturalHeight !== 0) {
        resolve({width, height, naturalWidth, naturalHeight});
        return;
      }

      image.addEventListener("load", () => {
        this.getImageSize().then(resolve);
      }, false);

      image.addEventListener("error", reject, false);
    });
  }

  updateImageSize() {
    const { zoom } = this.props;
    const { image } = this.refs;

    this.getImageSize().then(({width, height, naturalWidth, naturalHeight}) => {
      this.setState({
        width: Math.max(1, naturalWidth * zoom),
        height: Math.max(1, naturalHeight * zoom),
        naturalWidth,
        naturalHeight
      });
      this.refresh();
    });
  }

  refresh() {
    this.iScroll.refresh();
  }

  render() {
    const { image, className } = this.props;
    const { width, height } = this.state;
    const style = Object.assign({}, ImageViewer.defaultProps.style, this.props.style);

    return (
      <div ref="iScroll" className={className} style={style}>
        <div ref="wrapper" style={{
          position: "relative",
          width: "100%",
          height: "100%",
          minWidth: width,
          minHeight: height
        }}>
          <div ref="holder" style={{
            position: "absolute",
            top: "50%",
            left: "50%"
          }}>
            <img
              ref="image"
              src={image}
              style={{
                position: "relative",
                top: height / 2 * -1,
                left: width / 2 * -1,
                width,
                height
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

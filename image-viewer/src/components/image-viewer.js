import assign from "object-assign";
import React, { Component } from "react";
import IScroll from "iscroll";

export default class ImageViewer extends Component {
  static defaultProps = {
    className: "image-viewer",
    style: {
      position: "relative",
      width: "100%",
      height: "100%",
      overflow: "hidden"
    },
    zoom: 1,
    forceFitViewport: false,
    iScrollOptions: {
      bounce: true,
      click: true,
      freeScroll: true,
      scrollX: true,
      scrollY: true,
      mouseWheel: true,
      scrollbars: true,
      fadeScrollbars: true
    },
    onZoomChange: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      width: 0,
      height: 0,
      naturalWidth: 0,
      naturalHeight: 0,
      vw: 0,
      vh: 0
    };
  }

  componentDidMount() {
    const { iScrollOptions, zoom } = this.props;
    const { viewport, image } = this.refs;
    const { width: vw, height: vh } = this.getViewportSize();

    this.setState({vw, vh});

    this.iScroll = new IScroll(viewport, iScrollOptions);
    this.updateImageSize(zoom);
  }

  componentDidUpdate() {
    const { vw, vh } = this.state;
    const { width, height } = this.getViewportSize();
    const { forceFitViewport } = this.props;

    if (vw !== width || vh !== height) {
      this.setState({vw: width, vh: height});

      if (forceFitViewport) {
        this.updateImageSize();
      }
    }
  }

  componentWillUnmount() {
    this.iScroll.destroy();
    this.iScroll = null;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.zoom !== this.props.zoom) {
      this.updateImageSize(nextProps.zoom);
      this.props.onZoomChange(nextProps.zoom);
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

  updateImageSize(zoom) {
    const { forceFitViewport } = this.props;
    const { image } = this.refs;

    this.getImageSize().then(({width: w, height: h, naturalWidth, naturalHeight}) => {
      let width;
      let height;

      if (forceFitViewport) {
        const size = this.normalizeImageSize(naturalWidth, naturalHeight);
        width = size.width;
        height = size.height;

      } else {
        width = naturalWidth * zoom;
        height = naturalHeight * zoom;
      }

      this.setState({
        width,
        height,
        naturalWidth,
        naturalHeight
      });

      this.refresh();
    });
  }

  normalizeImageSize(dw, dh) {
    const { width: vw, height: vh } = this.getViewportSize();
    const vRatio = vw / vh;
    const dRatio = dw / dh;
    const ratio = vRatio > dRatio ? vh / dh : vw / dw;

    return {
      width: dw * ratio,
      height: dh * ratio
    };
  }

  getViewportSize() {
    const { width, height } = this.refs.viewport.getBoundingClientRect();
    return {width, height};
  }

  refresh() {
    this.iScroll.refresh();
  }

  render() {
    const { image, className } = this.props;
    const { width, height } = this.state;
    const style = assign({}, ImageViewer.defaultProps.style, this.props.style);

    return (
      <div ref="viewport" className={className} style={style}>
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

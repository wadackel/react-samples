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
    const { zoom, iScrollOptions } = this.props;
    const { viewport } = this.refs;
    const { width: vw, height: vh } = this.getViewportSize();

    this.iScroll = new IScroll(viewport, iScrollOptions);

    this.setState({vw, vh});
    this.updateImageSizeByZoom(zoom);
  }

  componentWillUnmount() {
    this.iScroll.destroy();
    this.iScroll = null;
  }

  componentDidUpdate() {
    const { vw, vh } = this.state;
    const { width, height } = this.getViewportSize();

    if (vw !== width || vh !== height) {
      this.setState({vw: width, vh: height});
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      forceFitViewport,
      zoom
    } = this.props;

    const {
      forceFitViewport: _forceFitViewport,
      zoom: _zoom
    } = nextProps;

    // Force fit viewport
    if (forceFitViewport !== _forceFitViewport && _forceFitViewport) {
      const { width: dw, height: dh, naturalWidth } = this.state;
      const { width } = this.normalizeImageSize(dw, dh);
      this.updateImageSizeByZoom(width / naturalWidth);
    }

    // Zoom
    if (zoom !== _zoom) {
      this.updateImageSizeByZoom(_zoom);
    }
  }

  updateImageSizeByZoom(zoom) {
    const { zoom: prevZoom } = this.props;

    this.getImageSize().then(({width, height, naturalWidth, naturalHeight}) => {
      this.setImageSize(
        naturalWidth * zoom,
        naturalHeight * zoom,
        naturalWidth,
        naturalHeight
      );

      if (zoom !== prevZoom) {
        this.props.onZoomChange(zoom);
      }

      this.refresh();
    });
  }

  getViewportSize() {
    const { width, height } = this.refs.viewport.getBoundingClientRect();
    return {width, height};
  }

  getImageSize() {
    return new Promise((resolve, reject) => {
      const { image } = this.refs;
      const { width, height, naturalWidth, naturalHeight } = image;

      if (naturalWidth !== 0 || naturalHeight !== 0) {
        return resolve({
          width,
          height,
          naturalWidth,
          naturalHeight
        });
      }

      image.addEventListener("load", () => {
        this.getImageSize().then(resolve);
      }, false);

      image.addEventListener("error", reject, false);
    });
  }

  setImageSize(width, height, naturalWidth, naturalHeight) {
    this.setState({
      width,
      height,
      naturalWidth,
      naturalHeight
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

  refresh() {
    this.iScroll.refresh();
  }

  render() {
    const { image, className } = this.props;
    const { width, height } = this.state;
    const style = assign({}, ImageViewer.defaultProps.style, this.props.style);

    const wrapperStyle = {
      position: "relative",
      width: "100%",
      height: "100%",
      minWidth: width,
      minHeight: height
    };

    const holderStyle = {
      position: "absolute",
      top: "50%",
      left: "50%"
    };

    const imageStyle = {
      position: "relative",
      top: height / 2 * -1,
      left: width / 2 * -1,
      width,
      height
    };

    return (
      <div ref="viewport" className={className} style={style}>
        <div ref="wrapper" style={wrapperStyle}>
          <div ref="holder" style={holderStyle}>
            <img
              ref="image"
              src={image}
              style={imageStyle}
            />
          </div>
        </div>
      </div>
    );
  }

  // constructor(props) {
  //   super(props);
  //
  //   this.state = {
  //     width: 0,
  //     height: 0,
  //     naturalWidth: 0,
  //     naturalHeight: 0,
  //     vw: 0,
  //     vh: 0
  //   };
  // }
  //
  // componentDidMount() {
  //   const { iScrollOptions, zoom } = this.props;
  //   const { viewport, image } = this.refs;
  //   const { width: vw, height: vh } = this.getViewportSize();
  //
  //   this.setState({vw, vh});
  //
  //   this.iScroll = new IScroll(viewport, iScrollOptions);
  //   this.updateImageSize(zoom);
  // }
  //
  // componentDidUpdate() {
  //   const { vw, vh } = this.state;
  //   const { width: dw } = this.refs.image;
  //   const { width, height } = this.getViewportSize();
  //   const { forceFitViewport } = this.props;
  //   const zoom = dw / width;
  //
  //   if (vw !== width || vh !== height) {
  //     this.setState({vw: width, vh: height});
  //   }
  //
  //   if (forceFitViewport && zoom !== this.props.zoom) {
  //     this.props.onZoomChange(zoom);
  //   }
  // }
  //
  // componentWillUnmount() {
  //   this.iScroll.destroy();
  //   this.iScroll = null;
  // }
  //
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.forceFitViewport !== this.props.forceFitViewport && nextProps.forceFitViewport === true) {
  //     this.updateImageSize(null, true);
  //
  //   } else if (nextProps.zoom !== this.props.zoom) {
  //     this.updateImageSize(nextProps.zoom, false);
  //   }
  // }
  //
  // getImageSize() {
  //   return new Promise((resolve, reject) => {
  //     const { image } = this.refs;
  //     const { width, height, naturalWidth, naturalHeight } = image;
  //
  //     if (width !== 0 || height !== 0 || naturalWidth !== 0 || naturalHeight !== 0) {
  //       resolve({width, height, naturalWidth, naturalHeight});
  //       return;
  //     }
  //
  //     image.addEventListener("load", () => {
  //       this.getImageSize().then(resolve);
  //     }, false);
  //
  //     image.addEventListener("error", reject, false);
  //   });
  // }
  //
  // updateImageSize(zoom = null, forceFitViewport) {
  //   return new Promise((resolve, reject) => {
  //     const { image } = this.refs;
  //
  //     this.getImageSize().then(({width: w, height: h, naturalWidth, naturalHeight}) => {
  //       let width;
  //       let height;
  //
  //       if (forceFitViewport) {
  //         const size = this.normalizeImageSize(naturalWidth, naturalHeight);
  //         width = size.width;
  //         height = size.height;
  //
  //       } else {
  //         width = naturalWidth * zoom;
  //         height = naturalHeight * zoom;
  //       }
  //
  //       this.setState({
  //         width,
  //         height,
  //         naturalWidth,
  //         naturalHeight
  //       });
  //
  //       this.refresh();
  //     });
  //   });
  // }
  //
  // normalizeImageSize(dw, dh) {
  //   const { width: vw, height: vh } = this.getViewportSize();
  //   const vRatio = vw / vh;
  //   const dRatio = dw / dh;
  //   const ratio = vRatio > dRatio ? vh / dh : vw / dw;
  //
  //   return {
  //     width: dw * ratio,
  //     height: dh * ratio
  //   };
  // }
  //
  // getViewportSize() {
  //   const { width, height } = this.refs.viewport.getBoundingClientRect();
  //   return {width, height};
  // }
  //
  // refresh() {
  //   this.iScroll.refresh();
  // }
  //
  // render() {
  //   const { image, className } = this.props;
  //   const { width, height } = this.state;
  //   const style = assign({}, ImageViewer.defaultProps.style, this.props.style);
  //
  //   return (
  //     <div ref="viewport" className={className} style={style}>
  //       <div ref="wrapper" style={{
  //         position: "relative",
  //         width: "100%",
  //         height: "100%",
  //         minWidth: width,
  //         minHeight: height
  //       }}>
  //         <div ref="holder" style={{
  //           position: "absolute",
  //           top: "50%",
  //           left: "50%"
  //         }}>
  //           <img
  //             ref="image"
  //             src={image}
  //             style={{
  //               position: "relative",
  //               top: height / 2 * -1,
  //               left: width / 2 * -1,
  //               width,
  //               height
  //             }}
  //           />
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
}

import React, { Component } from "react";
import Slider from "material-ui/Slider";
import bindHandlerHelper from "../utils/bind-handler-helper";
import * as Zoom from "../constants/zoom";
import * as Images from "../constants/images";
import Header, { HEADER_HEIGHT } from "./header";
import ImageViewer from "./image-viewer";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sw: 0,
      sh: 0,
      image: Images.IMAGE1,
      zoom: 1,
      forceFitViewport: false
    };

    bindHandlerHelper([
      "handleResize",
      "handleImageChange",
      "handleZoomChange",
      "handleZoomFit",
      "handleDoubleClick"
    ], this);
  }

  componentDidMount() {
    this.updateStageSize();
    window.addEventListener("resize", this.handleResize);
  }

  updateStageSize() {
    const { width: sw, height: sh } = this.getWindowSize();
    this.setState({sw, sh});
  }

  getWindowSize() {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight - HEADER_HEIGHT
    };
  }

  handleResize() {
    this.updateStageSize();
  }

  handleZoomChange(value) {
    const zoom = Math.max(Zoom.MIN, Math.min(Zoom.MAX, value));

    console.log("ZOOM_CHANGE", zoom);

    this.setState({
      forceFitViewport: false,
      zoom
    });
  }

  handleZoomFit() {
    this.setState({forceFitViewport: true});
  }

  handleImageChange(image) {
    this.setState({image});
  }

  handleDoubleClick() {
    this.setState({forceFitViewport: true});
  }

  render() {
    const { sw, sh, image, zoom, forceFitViewport } = this.state;

    return (
      <div style={{width: "100%", height: "100%"}}>
        <Header
          onZoomIn={() => this.handleZoomChange(zoom + 0.3)}
          onZoomOut={() => this.handleZoomChange(zoom - 0.3)}
          onZoomActualSize={() => this.handleZoomChange(1)}
          onZoomFit={this.handleZoomFit}
          onImageChange={this.handleImageChange}
        />
        <ImageViewer
          style={{
            top: HEADER_HEIGHT,
            width: sw,
            height: sh
          }}
          image={image}
          zoom={zoom}
          forceFitViewport={forceFitViewport}
          onZoomChange={value => this.handleZoomChange(value)}
          onDoubleClick={this.handleDoubleClick}
        />
        <Slider
          value={zoom}
          min={Zoom.MIN}
          max={Zoom.MAX}
          style={{
            position: "absolute",
            right: 30,
            bottom: 0,
            width: 300
          }}
          onChange={(e, value) => this.handleZoomChange(value)}
        />
      </div>
    );
  }
}

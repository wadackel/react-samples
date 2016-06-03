import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import Slider from "material-ui/Slider";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import NavigationClose from "material-ui/svg-icons/navigation/close";
import ImageIcon from "material-ui/svg-icons/image/image";
import ZoomInIcon from "material-ui/svg-icons/action/zoom-in";
import ZoomOutIcon from "material-ui/svg-icons/action/zoom-out";
import ZoomOutMapIcon from "material-ui/svg-icons/maps/zoom-out-map";
import ArrowDropRight from "material-ui/svg-icons/navigation-arrow-drop-right";
import bindHandlerHelper from "../utils/bind-handler-helper";
import ImageViewer from "./image-viewer";

const APP_BAR_HEIGHT = 64;

const Zoom = {
  MIN: 0.01,
  MAX: 2
};

const Images = {
  IMAGE1: "./images/image1.png",
  IMAGE2: "./images/image2.png"
};

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
      "handleFitViewport"
    ], this);
  }

  componentDidMount() {
    const { width: sw, height: sh } = this.getWindowSize();
    this.setState({sw, sh});

    window.addEventListener("resize", this.handleResize);
  }

  getWindowSize() {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight - APP_BAR_HEIGHT
    };
  }

  handleResize() {
    const { width: sw, height: sh } = this.getWindowSize();
    this.setState({sw, sh});
  }

  handleImageChange(image) {
    this.setState({
      zoom: 1,
      image
    });
  }

  handleZoomChange(value) {
    const zoom = Math.max(Zoom.MIN, Math.min(Zoom.MAX, value));

    console.log(zoom);

    this.setState({
      forceFitViewport: false,
      zoom
    });
  }

  handleFitViewport() {
    this.setState({forceFitViewport: true});
  }

  render() {
    const { sw, sh, image, zoom, forceFitViewport } = this.state;

    return (
      <div style={{width: "100%", height: "100%"}}>
        <AppBar
          title="ImageViewer"
          iconElementLeft={<span />}
          iconElementRight={
            <IconMenu
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
              targetOrigin={{horizontal: "right", vertical: "top"}}
              anchorOrigin={{horizontal: "right", vertical: "top"}}
            >
              <MenuItem
                primaryText="Zoom"
                rightIcon={<ArrowDropRight />}
                menuItems={[
                  <MenuItem primaryText="Zoom in" leftIcon={<ZoomInIcon />} onTouchTap={() => this.handleZoomChange(this.state.zoom + 0.4)} />,
                  <MenuItem primaryText="Zoom out" leftIcon={<ZoomOutIcon />} onTouchTap={() => this.handleZoomChange(this.state.zoom - 0.4)} />,
                  <MenuItem primaryText="100%" leftIcon={<ZoomOutIcon />} onTouchTap={() => this.handleZoomChange(1)} />,
                  <MenuItem primaryText="Fit screen" leftIcon={<ZoomOutMapIcon />} onTouchTap={this.handleFitViewport} />
                ]}
              />
              <MenuItem
                primaryText="Images"
                rightIcon={<ArrowDropRight />}
                menuItems={[
                  <MenuItem primaryText="image1" leftIcon={<ImageIcon />} onTouchTap={() => this.handleImageChange(Images.IMAGE1)} />,
                  <MenuItem primaryText="image2" leftIcon={<ImageIcon />} onTouchTap={() => this.handleImageChange(Images.IMAGE2)} />
                ]}
              />
            </IconMenu>
          }
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            zIndex: 999
          }}
        />
        <ImageViewer
          style={{
            top: APP_BAR_HEIGHT,
            width: sw,
            height: sh
          }}
          image={image}
          zoom={zoom}
          forceFitViewport={forceFitViewport}
          onZoomChange={value => this.handleZoomChange(value)}
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
    return ;
  }
}

import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import NavigationClose from "material-ui/svg-icons/navigation/close";
import ImageIcon from "material-ui/svg-icons/image/image";
import ZoomInIcon from "material-ui/svg-icons/action/zoom-in";
import ZoomOutIcon from "material-ui/svg-icons/action/zoom-out";
import ZoomOutMapIcon from "material-ui/svg-icons/maps/zoom-out-map";
import ArrowDropRight from "material-ui/svg-icons/navigation-arrow-drop-right";
import bindHandlerHelper from "../utils/bind-handler-helper";
import * as Images from "../constants/images";

export const HEADER_HEIGHT = 64;

export default class Header extends Component {
  constructor(props) {
    super(props);

    bindHandlerHelper([
      "handleZoomInClick",
      "handleZoomOutClick",
      "handleZoomActualSizeClick",
      "handleZoomFitClick",
      "handleImageClick"
    ], this);
  }

  handleZoomInClick() {
    this.props.onZoomIn();
  }

  handleZoomOutClick() {
    this.props.onZoomOut();
  }

  handleZoomActualSizeClick() {
    this.props.onZoomActualSize();
  }

  handleZoomFitClick() {
    this.props.onZoomFit();
  }

  handleImageClick(value) {
    this.props.onImageChange(value);
  }

  render() {
    return (
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
                <MenuItem primaryText="Zoom in" leftIcon={<ZoomInIcon />} onTouchTap={this.handleZoomInClick} />,
                <MenuItem primaryText="Zoom out" leftIcon={<ZoomOutIcon />} onTouchTap={this.handleZoomOutClick} />,
                <MenuItem primaryText="100%" leftIcon={<ZoomOutIcon />} onTouchTap={this.handleZoomActualSizeClick} />,
                <MenuItem primaryText="Fit screen" leftIcon={<ZoomOutMapIcon />} onTouchTap={this.handleZoomFitClick} />
              ]}
            />
            <MenuItem
              primaryText="Images"
              rightIcon={<ArrowDropRight />}
              menuItems={[
                <MenuItem primaryText="image1" leftIcon={<ImageIcon />} onTouchTap={() => this.handleImageClick(Images.IMAGE1)} />,
                <MenuItem primaryText="image2" leftIcon={<ImageIcon />} onTouchTap={() => this.handleImageClick(Images.IMAGE2)} />
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
    );
  }
}

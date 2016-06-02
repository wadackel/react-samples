import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import NavigationClose from "material-ui/svg-icons/navigation/close";
import RotateLeftIcon from "material-ui/svg-icons/image/rotate-left";
import RotateRightIcon from "material-ui/svg-icons/image/rotate-right";
import bindHandlerHelper from "../utils/bind-handler-helper";
import ImageViewer from "./image-viewer";

const APP_BAR_HEIGHT = 64;

export default class App extends Component {
  constructor(props) {
    super(props);

    const { width: sw, height: sh } = this.getWindowSize();

    this.state = {sw, sh};

    bindHandlerHelper([
      "handleResize"
    ], this);
  }

  componentDidMount() {
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

  render() {
    const { sw, sh } = this.state;

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
              <MenuItem primaryText="45°" leftIcon={<RotateRightIcon />} />
              <MenuItem primaryText="-45°" leftIcon={<RotateLeftIcon />} />
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
        <ImageViewer width={sw} height={sh} style={{marginTop: APP_BAR_HEIGHT}} image="./images/screenshot.png" />
      </div>
    );
    return ;
  }
}

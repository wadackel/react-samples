import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import NavigationClose from "material-ui/svg-icons/navigation/close";
import RotateLeftIcon from "material-ui/svg-icons/image/rotate-left";
import RotateRightIcon from "material-ui/svg-icons/image/rotate-right";
import ImageEditor from "./image-editor";


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{width: "100%", height: "100%"}}>
        <AppBar
          title="ImageEditor"
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
        />
        <ImageEditor width="500" height="500" image="./images/screenshot.png" />
      </div>
    );
    return ;
  }
}

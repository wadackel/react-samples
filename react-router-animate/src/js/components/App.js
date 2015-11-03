import React, {Component, PropTypes} from "react"
import RouteCSSTransitionGroup from "./RouteCSSTransitionGroup"
import mui from "material-ui"


const {
  AppBar,
  LeftNav,
  MenuItem,
  Mixins
} = mui;

const {
  StylePropable,
  StyleResizable
} = Mixins;

export default class App extends Component {
  mixins = [StylePropable, StyleResizable]

  render() {
    const menuItemsNav = [
      {route: "/", text: "Home"},
      {route: "/page1", text: "Page1"},
      {route: "/page2", text: "Page2"}
    ];

    return (
      <div>
        <AppBar
          title="React router animate"
          onLeftIconButtonTouchTap={::this.handleLeftIconButtonTouchTap} />

        <LeftNav
          ref="leftNav"
          docked={false}
          menuItems={menuItemsNav}
          onChange={::this.handleLeftItemChange} />

        <div className="container">
          <RouteCSSTransitionGroup
            component="div" transitionName="routing"
            transitionEnterTimeout={250} transitionLeaveTimeout={250} >
            {this.props.children}
          </RouteCSSTransitionGroup>
        </div>
      </div>
    );
  }

  handleLeftIconButtonTouchTap() {
    this.refs.leftNav.toggle();
  }

  handleLeftItemChange(e, selectedIndex, menuItem) {
    this.props.history.pushState(null, menuItem.route);
  }
}
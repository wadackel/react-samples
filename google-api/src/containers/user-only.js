"use strict";

import React, {Component, PropTypes} from "react"
import {connect} from "react-redux"

class UserOnly extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  componentWillMount() {
    this.guestWillTransfer(this.props, this.context.router);
  }

  componentWillUpdate(nextProps) {
    this.guestWillTransfer(nextProps, this.context.router);
  }

  guestWillTransfer(props, router) {
    const {auth: {authenticated}} = props;
    if (!authenticated) {
      router.replace("/");
    }
  }

  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}

export default connect(
  state => state
)(UserOnly);

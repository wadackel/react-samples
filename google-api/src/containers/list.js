"use strict";

import React, {Component} from "react"
import Helmet from "react-helmet"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import * as driveActions from "../actions/drive"

class List extends Component {
  componentWillMount() {
    this.props.fetchItems();
  }

  renderItems() {
    const {items} = this.props.drives;
    return items.map((item) =>
      <li key={item.id}>{item.id} : {item.name}</li>
    );
  }

  render() {
    return (
      <div>
        <Helmet
          title="LIST"
          meta={[
            {name: "description", content: "list"}
          ]}
        />
        List
        {this.renderItems()}
      </div>
    );
  }
}

export default connect(
  state => ({drives: state.drives}),
  dispatch => bindActionCreators(driveActions, dispatch)
)(List);

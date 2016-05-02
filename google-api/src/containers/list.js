"use strict";

import React, {Component} from "react"
import Helmet from "react-helmet"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import * as driveActions from "../actions/drive"

import fetch from "isomorphic-fetch"

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenshot: ""
    };
  }

  componentWillMount() {
    this.props.fetchItems();
  }

  handleSubmit(e) {
    e.preventDefault();
    const name = this.refs.name.value.trim();
    const content = this.refs.content.value.trim();
    this.props.addItem(name, content);
  }

  handleItemClick(id) {
    this.props.deleteItem(id);
  }

  handleUrlSubmit(e) {
    e.preventDefault();
    const url = this.refs.url.value.trim();
    this.setState({screenshot: `/api/screenshot/${encodeURIComponent(url)}`});
  }

  renderItems() {
    return this.props.drives.items.map((item) =>
      <li key={item.id} onClick={(e) => {
        e.preventDefault();
        this.handleItemClick(item.id);
      }}>{item.id} : {item.name}</li>
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
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input ref="name" type="text" defaultValue="Filename" />
          <input ref="content" type="text" defaultValue="Hello World!!" />
          <button type="submit">Submit</button>
        </form>

        <form onSubmit={this.handleUrlSubmit.bind(this)}>
          <input type="text" ref="url" defaultValue="https://blog.wadackel.me" />
          <button type="submit">Submit</button>
          <img src={this.state.screenshot} />
        </form>

        <h2>List</h2>
        {this.renderItems()}
      </div>
    );
  }
}

export default connect(
  state => ({drives: state.drives}),
  dispatch => bindActionCreators(driveActions, dispatch)
)(List);

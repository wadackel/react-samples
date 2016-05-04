"use strict";

import React, {Component} from "react"
import Helmet from "react-helmet"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import * as driveActions from "../actions/drive"
import {imageToBlob} from "../utils/blob"

import fetch from "isomorphic-fetch"


class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenshot: `/api/screenshot/${encodeURIComponent("https://blog.wadackel.me")}`
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

  handleDeleteClick(id) {
    this.props.deleteItem(id);
  }

  handleUrlSubmit(e) {
    e.preventDefault();
    const url = this.refs.url.value.trim();
    this.setState({screenshot: `/api/screenshot/${encodeURIComponent(url)}`});
  }

  handleImageSubmit(e) {
    e.preventDefault();

    imageToBlob(this.refs.screenshotImage).then((blob) => {
      const formData = new FormData();
      formData.append("screenshot", blob);

      fetch(`/api/upload/`, {
        method: "POST",
        body: formData,
        credentials: "include"
      })
      .then(res => res.json())
      .then((res) => {
        this.props.fetchItems();
      });
    });
  }

  renderItems() {
    return this.props.drives.items.map((item) =>
      <li key={item.id}>
        [{item.id}] {item.name}
        {" - "}
        <a href={`/api/${item.id}`} target="_blank">Show</a>
        {" "}
        <button type="button" onClick={e => this.handleDeleteClick(item.id)}>Delete</button>
      </li>
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
          <button type="submit">Get image</button>
          <button type="button" onClick={this.handleImageSubmit.bind(this)}>Submit</button>
        </form>

        <h2>List</h2>
        {this.renderItems()}

        <h2>Screenshot</h2>
        <img ref="screenshotImage" src={this.state.screenshot} style={{maxWidth: "500px", height: "auto", border: "1px solid #000"}} />
      </div>
    );
  }
}

export default connect(
  state => ({drives: state.drives}),
  dispatch => bindActionCreators(driveActions, dispatch)
)(List);

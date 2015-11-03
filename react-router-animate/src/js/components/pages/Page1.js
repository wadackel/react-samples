import React, {Component, PropTypes} from "react"
import {Link} from "react-router"
import {
  Paper,
  FlatButton
} from "material-ui"


export default class Page1 extends Component {
  render() {
    return (
      <div className="contents">
        <Paper className="paper">
          <h2>Page1</h2>
          <p>Page1のコンテンツが入ります。</p>
          <FlatButton label="Go Home" containerElement={<Link to="/" />} linkButton={true} />
          <FlatButton label="Go Page2" containerElement={<Link to="/page2" />} linkButton={true} />
        </Paper>
      </div>
    );
  }
}
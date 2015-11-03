import React, {Component, PropTypes} from "react"
import {Link} from "react-router"
import {
  Paper,
  FlatButton
} from "material-ui"


export default class Page2 extends Component {
  render() {
    return (
      <div className="contents">
        <Paper className="paper">
          <h2>Page2</h2>
          <p>Page2のコンテンツが入ります。</p>
          <FlatButton label="Go Home" containerElement={<Link to="/" />} linkButton={true} />
          <FlatButton label="Go Page1" containerElement={<Link to="/page1" />} linkButton={true} />
        </Paper>
      </div>
    );
  }
}
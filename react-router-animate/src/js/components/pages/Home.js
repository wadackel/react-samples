import React, {Component, PropTypes} from "react"
import {Link} from "react-router"
import {
  Paper,
  FlatButton
} from "material-ui"


export default class Home extends Component {
  render() {
    return (
      <div className="contents">
        <Paper className="paper">
          <h2>Home</h2>
          <p>Homeのコンテンツが入ります。</p>
          <FlatButton label="Go Page1" containerElement={<Link to="/page1" />} linkButton={true} />
          <FlatButton label="Go Page2" containerElement={<Link to="/page2" />} linkButton={true} />
        </Paper>
      </div>
    );
  }
}
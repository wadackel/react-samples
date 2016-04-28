"use strict";

import React, {Component} from "react"
import Helmet from "react-helmet"

export default class About extends Component {
  render() {
    return (
      <div>
        <Helmet
          title="ABOUT"
          meta={[
            {name: "description", content: "about"}
          ]}
        />
        About
      </div>
    );
  }
}

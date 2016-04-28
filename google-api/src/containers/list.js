"use strict";

import React, {Component} from "react"
import Helmet from "react-helmet"

export default class List extends Component {
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
      </div>
    );
  }
}

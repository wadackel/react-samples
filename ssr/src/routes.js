"use strict";

import React from "react"
import {Router, Route, IndexRoute, browserHistory} from "react-router"
import {
  App,
  About,
  Home
} from "./containers/"

export default () => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/about/" component={About} />
      </Route>
    </Router>
  );
}

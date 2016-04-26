"use strict";

import React from "react"
import {Router, Route, IndexRoute} from "react-router"
import {
  App,
  About,
  Home
} from "./containers/"

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/about/" component={About} />
  </Route>
);

export default routes;

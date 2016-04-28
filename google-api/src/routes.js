"use strict";

import React from "react"
import {Router, Route, IndexRoute} from "react-router"
import {
  App,
  About,
  Home,
  List
} from "./containers/"

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/about/" component={About} />
    <Route path="/list/" component={List} />
  </Route>
);

export default routes;

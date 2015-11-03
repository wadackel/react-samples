import React from "react"
import {Route, IndexRoute} from "react-router"
import App from "./components/App"
import Home from "./components/pages/Home"
import Page1 from "./components/pages/Page1"
import Page2 from "./components/pages/Page2"


export default (
  <Route path="/" component={App}>
    <Route path="page1" component={Page1} />
    <Route path="page2" component={Page2} />
    <IndexRoute component={Home} />
  </Route>
);
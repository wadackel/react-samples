import React from "react"
import ReactDOM from "react-dom"
import {Router} from "react-router"
import createHashHistory from "history/lib/createHashHistory"
import injectTapEventPlugin from "react-tap-event-plugin"
import routes from "./routes"


injectTapEventPlugin();

const history = createHashHistory();

ReactDOM.render(
  <Router history={history}>
    {routes}
  </Router>,
  document.getElementById("app")
);
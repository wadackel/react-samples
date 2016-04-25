import React from "react"
import {render} from "react-dom"
import App from "./containers/app"

const initialState = JSON.parse(document.getElementById("initial-state").getAttribute("data-json"));

render(
  <App data={initialState} />,
  document.getElementById("app")
);

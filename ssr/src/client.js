"use strict";

import React from "react"
import {render} from "react-dom"
import getRoutes from "./routes"

render(
  getRoutes(),
  document.getElementById("app")
);

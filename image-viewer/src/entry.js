import React from "react";
import { render } from "react-dom";
import injectTapEventPlugin from 'react-tap-event-plugin';
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import App from "./components/app";

injectTapEventPlugin();

const darkMuiTheme = getMuiTheme(darkBaseTheme);

render(
  <MuiThemeProvider muiTheme={darkMuiTheme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById("app")
);

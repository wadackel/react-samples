"use strict";

import path from "path"
import express from "express"
import bodyParser from "body-parser"
import React from "react"
import {renderToString} from "react-dom/server"
import {match, RouterContext} from "react-router"
import getRoutes from "./routes"

const PORT = process.env.PORT || 3000;
const app = express();


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "../public")));
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "../views"));


function renderFullPage(html) {
  return `
  <!DOCTYPE html>
  <html lang="ja">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>React ssr sample</title>
  </head>
  <body>
    <div id="app">${html}</div>
    <script src="/js/client.bundle.js"></script>
  </body>
  </html>
  `;
}


app.get("*", (req, res) => {
  match({routes: getRoutes(), location: req.url}, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);

    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);

    } else if (renderProps) {
      const html = renderToString(<RouterContext {...renderProps} />);
      res.status(200).send(renderFullPage(html));
      // res.status(200).send(renderToString(<RouterContext {...renderProps} />));

    } else {
      res.status(404).send("Not found");
    }
  });
});


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

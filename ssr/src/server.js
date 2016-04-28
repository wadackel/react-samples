"use strict";

import path from "path"
import express from "express"
import bodyParser from "body-parser"
import React from "react"
import Helmet from "react-helmet"
import {Provider} from "react-redux"
import {renderToString} from "react-dom/server"
import {match, RouterContext, createMemoryHistory} from "react-router"
import {syncHistoryWithStore} from "react-router-redux"
import configureStore from "./store/configureStore"
import routes from "./routes"

const PORT = process.env.PORT || 3000;
const app = express();


const HTML = ({content, store}) => {
  const head = Helmet.rewind();
  const attrs = head.htmlAttributes.toComponent();

  return (
    <html {...attrs}>
      <head>
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.title.toComponent()}
        {head.style.toComponent()}
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{__html: content}} />
        <script id="initial-state" type="text/plain" data-json={JSON.stringify(store.getState())}></script>
        <script src="/js/client.bundle.js"></script>
      </body>
    </html>
  );
}


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "../public")));
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "../views"));


app.use((req, res) => {
  const memoryHistory = createMemoryHistory(req.url);
  const store = configureStore(memoryHistory);
  const history = syncHistoryWithStore(memoryHistory, store);

  match({history, routes, location: req.url}, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);

    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);

    } else if (renderProps) {
      const content = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );

      res.status(200).send(`<!doctype html>\n${renderToString(<HTML content={content} store={store} />)}`);
    }
  });
});


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

"use strict";

import path from "path"
import dotenv from "dotenv"
import express from "express"
import session from "express-session"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import React from "react"
import Helmet from "react-helmet"
import {Provider} from "react-redux"
import {renderToString} from "react-dom/server"
import {match, RouterContext, createMemoryHistory} from "react-router"
import {syncHistoryWithStore} from "react-router-redux"
import configureStore from "./store/configureStore"
import authenticate from "./middleware/auth"
import routes from "./routes"
import apiRoutes from "./routes/api"
import authRoutes from "./routes/auth"


dotenv.config();
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


app.use(cookieParser());
app.use(session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 60 * 1000
  }
}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "../public")));


app.use(authenticate);
app.use("/api", apiRoutes);
app.use("/auth", authRoutes);


app.use((req, res) => {
  const initialState = {auth: {authenticated: req.authenticated}};
  const memoryHistory = createMemoryHistory(req.url);
  const store = configureStore(memoryHistory, initialState);
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

    } else {
      res.status(404).send("Not found");
    }
  });
});


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

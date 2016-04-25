"use strict";

import path from "path"
import express from "express"
import bodyParser from "body-parser"
import React from "react"
import {renderToString} from "react-dom/server"
import App from "./containers/app"

const PORT = process.env.PORT || 3000;
const app = express();


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "../public")));
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "../views"));


app.get("/", (req, res) => {
  const initialState = [
    {id: 1, name: "TITLE1"},
    {id: 2, name: "TITLE2"},
    {id: 3, name: "TITLE3"}
  ];

  res.render("index", {
    initialState: JSON.stringify(initialState),
    markup: renderToString(<App data={initialState} />)
  });
});


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

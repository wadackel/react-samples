"use strict";

import {Router} from "express"
import Multer from "multer"

const router = Router();
const multer = Multer();


router.use((req, res, next) => {
  const token = req.cookies.token;
  if (!req.authenticated) {
    res.status(401).json({status: "error", message: "Login is required"});
  } else {
    next();
  }
});

router.get("/", (req, res) => {
  req.drive.files.list({
  }, (err, result) => {
    console.log(err, result);
    res.json(err || result);
  });
});

router.post("/", multer.array(), (req, res) => {
  const {name, content} = req.body;

  req.drive.files.create({
    resource: {
      name,
      mimeType: "text/plain",
      parents: ["appDataFolder"]
    },
    media: {
      mimeType: "text/plain",
      body: content
    }
  }, (err, result) => {
    console.log(err, result);
    res.json(err || result);
  });
});

router.delete("/:id", (req, res) => {
  console.log(req.params.id);
  res.json({});
});

export default router;

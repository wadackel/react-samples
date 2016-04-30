"use strict";

import fs from "fs"
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
    fields: "nextPageToken, files(id, name, mimeType, modifiedTime)"
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

router.get("/:id", (req, res) => {
  const {id} = req.params;
  const tmpPath = `${__dirname}/../../tmp/text.txt`;
  const dest = fs.createWriteStream(tmpPath);
  const chunks = [];

  req.drive.files.get({
    fileId: id,
    alt: "media"
  })
  .on("end", () => {
    const buffer = Buffer.concat(chunks);
    res.json({
      id,
      body: buffer.toString()
    });
  })
  .on("data", (data) => {
    chunks.push(data);
  })
  .on("error", (err) => {
    console.log("ERROR", err);
  })
  .pipe(dest);
});

router.delete("/:id", (req, res) => {
  const {id} = req.params;

  req.drive.files.delete({
    fileId: id
  }, (err, result) => {
    res.json(err || {id});
  });
});

export default router;

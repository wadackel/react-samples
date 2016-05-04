"use strict";

import fs from "fs"
import path from "path"
import {Router} from "express"
import Multer from "multer"
import webshot from "webshot"

const router = Router();
const multer = Multer({
  dest: path.join(__dirname, "/../../tmp")
});


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
    fields: "nextPageToken, files(id, name, thumbnailLink, mimeType, modifiedTime)"
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
  const chunks = [];

  req.drive.files.get({
      fileId: id,
      alt: "media"
    })
    .on("error", err => res.json(err))
    .on("data", data => chunks.push(new Buffer(data)))
    .on("end", () => {
      const buffer = Buffer.concat(chunks);
      res.status(200).end(buffer, "binary");
    });
});

router.delete("/:id", (req, res) => {
  const {id} = req.params;

  req.drive.files.delete({
    fileId: id
  }, (err, result) => {
    res.json(err || {id});
  });
});


router.get("/screenshot/:url", (req, res) => {
  const chunks = [];
  const renderStream = webshot(req.params.url, {
    screenSize: {
      width: 1280,
      height: 768
    },
    shotSize: {
      width: 1280,
      height: "all"
    }
  });

  renderStream
    .on("data", (data) => {
      chunks.push(new Buffer(data));
    })
    .on("end", () => {
      const buffer = Buffer.concat(chunks);
      res.status(200).end(buffer, "binary");
    });
});

router.post("/upload", multer.fields([{name: "screenshot"}]), (req, res) => {
  const screenshot = req.files.screenshot[0];

  req.drive.files.create({
    resource: {
      name: screenshot.filename,
      mimeType: screenshot.mimetype,
      parents: ["appDataFolder"]
    },
    media: {
      body: fs.createReadStream(screenshot.path),
      mimeType: screenshot.mimetype
    }
  }, (err, file) => {
    if (file) {
      fs.unlinkSync(screenshot.path);
    }
    console.log(err, file);
    res.json(err || file);
  });
});

export default router;

"use strict";

import {Router} from "express"
const router = Router();
const SUCCESS_REDIRECT = "/list/";
const FAILURE_REDIRECT = "/";

router.get("/login", (req, res) => {
  if (req.authenticated) {
    res.redirect(SUCCESS_REDIRECT);
  } else {
    res.redirect(req.authenticateURL);
  }
});

router.get("/callback", (req, res) => {
  const oauth2Client = req.oauth2Client;

  oauth2Client.getToken(req.query.code, (err, token) => {
    if (err) {
      console.log("Error while trying to retrieve access token", err);
      res.redirect(FAILURE_REDIRECT);
      return;
    }
    req.session.token = token;
    res.redirect(SUCCESS_REDIRECT);
  });
});

export default router;

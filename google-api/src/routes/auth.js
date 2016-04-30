"use strict";

import {Router} from "express"
import * as Cookie from "../constants/cookie"

const router = Router();
const SUCCESS_REDIRECT = "/list/";
const FAILURE_REDIRECT = "/";
const LOGOUT_REDIRECT = "/";


router.get("/login", (req, res) => {
  if (req.authenticated) {
    res.redirect(SUCCESS_REDIRECT);
  } else {
    res.redirect(req.authenticateURL);
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token", null, {
    path: Cookie.PATH
  });

  res.redirect(LOGOUT_REDIRECT);
});

router.get("/callback", (req, res) => {
  const oauth2Client = req.oauth2Client;

  oauth2Client.getToken(req.query.code, (err, token) => {
    if (err) {
      console.log("Error while trying to retrieve access token", err);
      res.redirect(FAILURE_REDIRECT);
      return;
    }

    res.cookie("token", token, {
      path: Cookie.PATH,
      expires: new Date(token.expiry_date)
    });

    res.redirect(SUCCESS_REDIRECT);
  });
});

export default router;

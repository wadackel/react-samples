"use strict";

import Google from "googleapis"
import GoogleAuth from "google-auth-library"
import {
  VERSION,
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL,
  SPACES,
  SCOPES
} from "../constants/google-drive"


module.exports = (req, res, next) => {
  const token = req.cookies.token;
  const auth = new GoogleAuth();
  const oauth2Client = new auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
  );

  req.oauth2Client = oauth2Client;

  if (!token) {
    const url = oauth2Client.generateAuthUrl({
      scope: SCOPES
    });
    req.authenticated = false;
    req.authenticateURL = url;
    return next();
  }

  oauth2Client.credentials = token;

  const drive = Google.drive({
    version: VERSION,
    auth: oauth2Client,
    params: {
      spaces: SPACES
    }
  });

  req.authenticated = true;
  req.drive = drive;

  next();
};

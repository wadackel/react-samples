"use strict";

const Google = require("googleapis");
const GoogleAuth = require("google-auth-library");
const SCOPES = ["https://www.googleapis.com/auth/drive.appdata"];

module.exports = (req, res, next) => {
  const token = req.session.token;
  const auth = new GoogleAuth();
  const oauth2Client = new auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
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

  const drive = Google.drive({version: "v3", auth: oauth2Client});

  req.authenticated = true;
  req.drive = drive;

  next();
};

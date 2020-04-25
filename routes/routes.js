const express = require("express");
const router = express.Router();

const authHandler = require("../auth");

router.get("/", (_, res) => res.sendFile());

router.get("/auth/discord/login/", (_, res) =>
  res.redirect(
    "https://discordapp.com/api/oauth2/authorize" +
      "?client_id=" +
      process.env.CLIENT_ID +
      "&response_type=code" +
      "&scope=identify%20email" +
      "&redirect_uri=" +
      encodeURIComponent("http://localhost:3000/auth/callback")
  )
);

router.get("/auth/callback", async (req, res) => {
  authHandler(req, res);
});

module.exports = router;

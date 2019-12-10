require("dotenv").config();
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + "/views"));

app.get("/", (_, res) => res.sendFile());

app.get("/login", (_, res) =>
  res.redirect(
    "https://discordapp.com/api/oauth2/authorize" +
      "?client_id=" +
      process.env.CLIENT_ID +
      "&response_type=code" +
      "&scope=identify%20email" +
      "&redirect_uri=" +
      encodeURIComponent("https://discordapp.com/")
  )
);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

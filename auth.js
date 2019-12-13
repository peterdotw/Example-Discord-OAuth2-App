const axios = require("axios");
const qs = require("query-string");

module.exports = handleAuth = async (req, res) => {
  try {
    const code = await req.query.code;

    const formData = await qs.stringify({
      code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: "authorization_code",
      redirect_uri: "http://localhost:3000/auth/callback",
      scope: "identify email"
    });

    const auth = await axios.post(
      "https://discordapp.com/api/v6/oauth2/token",
      formData,
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        }
      }
    );

    const user = await axios.get("https://discordapp.com/api/v6/users/@me", {
      headers: {
        Authorization: "Bearer " + auth.data.access_token
      }
    });

    console.log(user.data);

    await res.redirect("http://localhost:3000");
  } catch (error) {
    console.log(error);
  }
};

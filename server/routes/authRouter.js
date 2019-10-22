const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello Auth");
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    console.log(req.user);
    res.redirect("/");
  },
);

router.get(
  "/logout",
  (req, res) => {
    req.logout();
    res.redirect("/");
  },
);

module.exports = router;

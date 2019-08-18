const express = require("express");
const userRouter = require("../components/users/userRouter");

const router = express.Router();

router.route("/").get((req, res) => {
  res.send("Api");
});

router.use("/user", userRouter);

module.exports = router;

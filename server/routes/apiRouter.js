const express = require("express");
const userRouter = require("../components/users/userRouter");
const projectRouter = require("../components/projects/projectRouter");

const router = express.Router();

router.route("/").get((req, res) => {
  res.send("Api");
});

router.use("/user", userRouter);
router.use("/projects", projectRouter);

module.exports = router;

const express = require("express");
const { getUser, authenticate } = require("./userController");
const withUser = require("./middleware/withUser");

const userRouter = express.Router();


userRouter.get("/", getUser).post("/login", authenticate).post("/register", (req, res) => {}).get("/test", withUser);

module.exports = userRouter;

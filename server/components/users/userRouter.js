const express = require("express");
const { getUser } = require("./userController");

const userRouter = express.Router();

userRouter.get("/", getUser);

module.exports = userRouter;

const express = require("express");
const { getUser, authenticate } = require("./userController");

const userRouter = express.Router();

userRouter.get("/", getUser).post("/", authenticate);

module.exports = userRouter;

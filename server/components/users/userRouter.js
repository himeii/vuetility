const express = require("express");
const passport = require("passport");
const {
  getUser, login, register, logout,
} = require("./userController");

const userRouter = express.Router();


userRouter.get("/", getUser).post("/login", login).post("/register", register).get("/logout", logout);

module.exports = userRouter;

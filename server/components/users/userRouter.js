const express = require("express");
const {
  getUser, login, register, logout, getProjectsDashboard,
} = require("./userController");
const withUser = require("./middleware/withUser");
const protectedRoute = require("../../middleware/protected");

const userRouter = express.Router();


userRouter.get("/", protectedRoute, getUser).post("/login", login).post("/register", register).get("/logout", protectedRoute, logout)
  .get("/projects-dashboard", protectedRoute, withUser, getProjectsDashboard);

module.exports = userRouter;

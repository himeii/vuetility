const express = require("express");
const {
  getUser, login, register, logout, getProjectsDashboard, getTasks,
} = require("./userController");
const withUser = require("./middleware/withUser");
const protectedRoute = require("../../middleware/protected");

const userRouter = express.Router();


userRouter.get("/", protectedRoute, getUser)
  .get("/logout", protectedRoute, logout)
  .get("/projects-dashboard", protectedRoute, withUser, getProjectsDashboard)
  .get("/myTasks", protectedRoute, withUser, getTasks)
  .post("/login", login)
  .post("/register", register);

module.exports = userRouter;

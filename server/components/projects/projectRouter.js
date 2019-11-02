const { Router } = require("express");
const Controller = require("./projectController");
const protectedRoute = require("../../middleware/protected");
const getProject = require("./middleware/getProject");

const ProjectRouter = Router();

ProjectRouter
  .get("/", protectedRoute, Controller.getAll)
  .get("/:id", protectedRoute, getProject, Controller.getByID)
  .post("/", protectedRoute, Controller.createProject)
  .delete("/:id", protectedRoute, getProject, Controller.deleteProject)
  .patch("/:id", protectedRoute, getProject, Controller.editProject);

module.exports = ProjectRouter;

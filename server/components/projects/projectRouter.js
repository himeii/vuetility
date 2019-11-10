const { Router } = require("express");
const Controller = require("./projectController");
const protectedRoute = require("../../middleware/protected");
const getProject = require("./middleware/getProject");
const withUser = require("../users/middleware/withUser");
const TaskController = require("../tasks/taskController");

const ProjectRouter = Router();

ProjectRouter
  .get("/", protectedRoute, Controller.getAll)
  .get("/:id", protectedRoute, getProject, Controller.getByID)
  .get("/:id/currentSprint", protectedRoute, getProject, Controller.getCurrentSprint)
  .post("/", protectedRoute, Controller.createProject)
  .post("/:id/sprints/:sprintId/tasks", protectedRoute, getProject, withUser, Controller.createTask)
  .delete("/:id", protectedRoute, getProject, Controller.deleteProject)
  .patch("/:id", protectedRoute, getProject, Controller.editProject)
  .patch("/:id/tasks/:taskId", protectedRoute, getProject, TaskController.updateTask);

module.exports = ProjectRouter;

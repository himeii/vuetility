const { Router } = require("express");
const Controller = require("./projectController");
const protectedRoute = require("../../middleware/protected");
const getProject = require("./middleware/getProject");
const withUser = require("../users/middleware/withUser");
const TaskController = require("../tasks/taskController");
const SprintController = require("../sprints/sprintController");

const ProjectRouter = Router();

ProjectRouter
  .get("/", protectedRoute, Controller.getAll)
  .get("/:id", protectedRoute, getProject, Controller.getByID)
  .get("/:id/backlog", protectedRoute, getProject, Controller.getBacklog)
  .get("/:id/currentSprint", protectedRoute, getProject, Controller.getCurrentSprint)
  .get("/:id/users", protectedRoute, getProject, Controller.getUsers)
  .get("/:id/sprints/endCurrentSprint", protectedRoute, getProject, SprintController.endSprint)
  .get("/:id/tasks/:taskId", protectedRoute, getProject, TaskController.getTask)
  .get("/:id/tasks/:taskId/toBacklog", protectedRoute, getProject, TaskController.sendToBacklog)
  .get("/:id/tasks/:taskId/take", protectedRoute, withUser, getProject, TaskController.takeTask)
  .get("/:id/planning", protectedRoute, getProject, SprintController.getUnfinishedTasks)
  .post("/", protectedRoute, Controller.createProject)
  .post("/:id/invite", protectedRoute, getProject, Controller.inviteUser)
  .post("/:id/sprints/:sprintId/tasks", protectedRoute, getProject, withUser, Controller.createTask)
  .post("/:id/sprints/startNewSprint", protectedRoute, getProject, SprintController.startSprint)
  .delete("/:id", protectedRoute, getProject, Controller.deleteProject)
  .patch("/:id", protectedRoute, getProject, Controller.editProject)
  .patch("/:id/tasks/:taskId", protectedRoute, getProject, TaskController.updateTask);

module.exports = ProjectRouter;

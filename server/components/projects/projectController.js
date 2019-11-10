const Joi = require("joi");
const Project = require("./projectModel");
const sortTasks = require("../../utils/sortTasks");

const createProjectSchema = Joi.object({
  name: Joi.string().required(),
});

const createProject = async (req, res) => {
  const { body, user } = req;
  const { value, error } = createProjectSchema.validate(body);
  if (error) {
    return res.status(400).send(error);
  }
  let project = await Project.create(value);
  project = await project.setScrumMaster(user);
  await project.addUser(user);
  await project.createSprint({ status: "CURRENT" });
  return res.status(201).send(project);
};

const deleteProject = async (req, res) => {
  const { project } = req;
  await project.destroy();
  return res.status(204).send();
};

const editProject = async (req, res) => {
  const { project, body } = req;
  const updated = await project.update(body);
  return res.status(200).send(updated);
};

const getByID = async (req, res) => {
  const { project } = req;
  return res.status(200).send(project);
};

const getAll = async (req, res) => {
  const projects = await Project.findAll();
  return res.status(200).send(projects);
};

const getCurrentSprint = async (req, res) => {
  const { project } = req;
  const sprints = await project.getSprints();
  const currentSprint = sprints.find((sprint) => sprint.get("status") === "CURRENT");
  const currentSprintTasks = await currentSprint.getTasks();
  const resultingTasks = sortTasks(currentSprintTasks);
  res.status(200).send({ sprint: currentSprint, tasks: resultingTasks });
};

const createTaskSchema = Joi.object({
  name: Joi.string().min(10).max(100).required(),
  description: Joi.string().min(10).max(500).allow(""),
  estimate: Joi.number().min(0),
  time_tracked: Joi.number().min(0),
});

const createTask = async (req, res) => {
  const {
    project, body, params, currentUser,
  } = req;
  const { sprintId } = params;
  const sprints = await project.getSprints();
  const sprint = sprints.find((s) => s.get("id") === sprintId);
  console.log(body);
  const { value, error } = createTaskSchema.validate(body);
  if (error) {
    return res.status(400).send(error);
  }
  console.log(value);
  let task = await sprint.createTask(value);
  task = await task.setReporter(currentUser);
  return res.status(201).send(task);
};

module.exports = {
  createProject,
  deleteProject,
  editProject,
  getByID,
  getAll,
  getCurrentSprint,
  createTask,
};

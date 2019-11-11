const Joi = require("joi");
const Project = require("./projectModel");
const sortTasks = require("../../utils/sortTasks");
const User = require("../users/userModel");

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
  await project.createSprint({ status: "BACKLOG" });
  return res.status(201).send(project);
};

const inviteUser = async (req, res) => {
  const { body, project } = req;
  const { email } = body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).send({ message: "No such user" });
  }
  const alreadyInvited = await project.hasUser(user);
  if (alreadyInvited) {
    return res.status(401).send({ message: "User is already invited", user });
  }
  await project.addUser(user);
  return res.status(200).send({ message: "User invited successfully", user });
};

const removeUserFromProject = async (req, res) => {
  const { body, project } = req;
  const backlog = (await project.getSprints({ where: { status: "BACKLOG" } })).pop();
  const { id } = body;
  const userToRemove = (await project.getUsers({ where: { id } })).pop();
  const userTasks = await userToRemove.getTasks();
  userTasks.forEach(async (task) => {
    await task.setSprint(backlog);
    await task.setAssignee(null);
  });
  await project.removeUser({ where: { id } });
  return res.status(200).send(userToRemove);
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
  if (!currentSprint) {
    return res.status(200).send({ message: "No current sprint" });
  }
  const currentSprintTasks = await currentSprint.getTasks();
  const resultingTasks = sortTasks(currentSprintTasks);
  return res.status(200).send({ sprint: currentSprint, tasks: resultingTasks });
};

const getBacklog = async (req, res) => {
  const { project } = req;
  const backlog = (await project.getSprints({ where: { status: "BACKLOG" } })).pop();
  if (!backlog) {
    return res.status(404).send({ message: "No backlog for this project" });
  }
  const tasks = await backlog.getTasks();
  return res.status(200).send({ backlog, tasks });
};

const getUsers = async (req, res) => {
  const { project } = req;
  const users = await project.getUsers({ attributes: { exclude: ["password"] } });
  res.status(200).send({ users });
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
  const { assignee } = body;
  const sprints = await project.getSprints();
  const sprint = sprints.find((s) => s.get("id") === sprintId);
  const { value, error } = createTaskSchema.validate(body);
  if (error) {
    return res.status(400).send(error);
  }
  let task = await sprint.createTask(value);
  task = await task.setReporter(currentUser);
  if (assignee) {
    const assigneeUser = await User.findOne(assignee);
    task = await task.setAssignee(assigneeUser);
  }
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
  getBacklog,
  inviteUser,
  getUsers,
  removeUserFromProject,
};

const Task = require("./taskModel");
const User = require("../users/userModel");

const getTasks = async (req, res) => {
  const { project } = req;
  const tasks = await project.getTasks();
  res.status(200).send(tasks);
};

const getTask = async (req, res) => {
  const { project, params } = req;
  const { taskId } = params;

  const task = await Task.findOne({ where: { id: taskId } });
  if (!task) {
    return res.status(404).send({ message: "No such task" });
  }
  const reporterId = task.get("reporterId");
  const assigneeId = task.get("assigneeId");

  const fields = ["firstName", "lastName", "id", "avatar"];

  const reporter = reporterId && (await User.findByPk(reporterId)).get(fields);
  const assignee = assigneeId && (await User.findByPk(assigneeId)).get(fields);


  return res.status(200).send({ ...task.get(), reporter, assignee });
};

const updateTask = async (req, res) => {
  const {
    body, params, project,
  } = req;
  const { taskId } = params;
  const task = await Task.findByPk(taskId);
  const updatedTask = await task.update(body);
  const projectId = project.get("id");

  global.io.sockets.in(`project-${projectId}`).emit("task updated", {
    taskId, task: updatedTask.get(),
  });

  res.status(200).send(updatedTask);
};

const sendToBacklog = async (req, res) => {
  const { project, params } = req;
  const { taskId } = params;
  const projectId = project.get("id");

  const backlog = (await project.getSprints({ where: { status: "BACKLOG" } })).pop();
  const task = await Task.findByPk(taskId);
  const result = await task.setSprint(backlog);

  global.io.sockets.in(`project-${projectId}`).emit("sent to backlog", { taskId });

  res.status(200).send(result);
};

const takeTask = async (req, res) => {
  const { currentUser, project, params } = req;
  const { taskId } = params;
  const currentSprint = (await project.getSprints({ where: { status: "CURRENT" } })).pop();
  const projectId = project.get("id");
  const task = await Task.findByPk(taskId);
  if (!task) {
    res.status(404).send({ message: "No such task" });
  }
  let result = await task.setAssignee(currentUser);
  if (currentSprint) {
    result = await result.setSprint(currentSprint);
  }

  console.log(global.io.sockets, global.io.sockets.rooms, "ROOMS");
  global.io.sockets.in(`project-${projectId}`).emit("task taken", { taskId });

  return res.status(200).send({ result });
};

module.exports = {
  getTasks,
  updateTask,
  getTask,
  sendToBacklog,
  takeTask,
};

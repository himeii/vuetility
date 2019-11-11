const Task = require("./taskModel");

const getTasks = async (req, res) => {
  const { project } = req;
  const tasks = await project.getTasks();
  res.status(200).send(tasks);
};

const getTask = async (req, res) => {
  const { project, params } = req;
  const { taskId } = params;
  console.log(project);
  const task = await Task.findOne({ where: { id: taskId } });
  if (!task) {
    return res.status(404).send({ message: "No such task" });
  }
  return res.status(200).send(task);
};

const updateTask = async (req, res) => {
  const {
    body, params,
  } = req;
  const { taskId } = params;
  const task = await Task.findByPk(taskId);
  const updatedTask = await task.update(body);
  res.status(200).send(updatedTask);
};


module.exports = {
  getTasks,
  updateTask,
  getTask,
};

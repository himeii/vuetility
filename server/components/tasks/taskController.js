const Task = require("./taskModel");

const getTasks = async (req, res) => {
  const { project } = req;
  const tasks = await project.getTasks();
  res.status(200).send(tasks);
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
};

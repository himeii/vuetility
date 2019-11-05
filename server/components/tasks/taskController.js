const Joi = require("joi");
const taskModel = require("./taskModel");

const getTasks = async (req, res) => {
  const { project } = req;
  const tasks = await project.getTasks();
  res.status(200).send(tasks);
};

const createTaskSchema = Joi.object({
  name: Joi.string().min(5).max(200).required(),
  description: Joi.string().min(10).max(500),
  estimate: Joi.number(),
  time_tracked: Joi.number(),
  status: Joi.string().valid(["TO DO", "IN PROGRESS", "IN REVIEW", "TESTING", "DONE"]),
});

const createTask = async (req, res) => {
  const { project, body } = req;
};
module.exports = {
  getTasks,
  createTask,
};

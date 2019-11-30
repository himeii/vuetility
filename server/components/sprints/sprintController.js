const { Sequelize } = require("../../config/db");

const { Op } = Sequelize;
const Task = require("../tasks/taskModel");

const endSprint = async (req, res) => {
  const { project } = req;
  const sprints = await project.getSprints();
  const currentSprint = sprints.find((sprint) => sprint.get("status") === "CURRENT");
  if (!currentSprint) {
    return res.status(400).send({ message: "No current sprint" });
  }
  const resultSprint = await currentSprint.update({ status: "LAST_FINISHED" });
  return res.status(200).send(resultSprint);
};

const getUnfinishedTasks = async (req, res) => {
  const { project } = req;
  const lastFinishedSprint = (await project.getSprints({ where: { status: "LAST_FINISHED" } })).pop();
  if (!lastFinishedSprint) {
    res.status(200).send({ message: "No finished sprint" });
  }
  const remainingTasks = await lastFinishedSprint.getTasks({ where: { status: { [Op.not]: "DONE" } } });
  return res.status(200).send({ tasks: remainingTasks });
};

const startSprint = async (req, res) => {
  const { project, body } = req;
  const { tasks } = body;
  const sprints = await project.getSprints();
  const upcomingSprints = sprints.filter((sprint) => sprint.get("status") === "UPCOMING");
  let nextSprint;
  if (!upcomingSprints.length) {
    nextSprint = await project.createSprint({ status: "CURRENT" });
  } else {
    nextSprint = upcomingSprints.sort((a, b) => +a.get("count") - +b.get("count")).pop();
  }

  const lastSprint = sprints.find((sprint) => sprint.get("status") === "LAST_FINISHED");
  // const lastSprintTasks = await lastSprint.getTasks();
  const unfinishedTasks = await Promise.all(tasks.map((id) => Task.findByPk(id)));
  console.log("UNFINISHED", unfinishedTasks);
  let resultSprint = nextSprint;
  await lastSprint.update({ status: "FINISHED" });
  resultSprint = await resultSprint.addTasks(unfinishedTasks);
  resultSprint = await resultSprint.update({ status: "CURRENT" });
  res.status(200).send(resultSprint);
};

module.exports = { endSprint, startSprint, getUnfinishedTasks };


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

const startSprint = async (req, res) => {
  const { project } = req;
  const sprints = await project.getSprints();
  const upcomingSprints = sprints.filter((sprint) => sprint.get("status") === "UPCOMING");
  let nextSprint;
  if (!upcomingSprints.length) {
    nextSprint = await project.createSprint({ status: "CURRENT" });
  } else {
    nextSprint = upcomingSprints.sort((a, b) => +a.get("count") - +b.get("count")).pop();
  }

  const lastSprint = sprints.find((sprint) => sprint.get("status") === "LAST_FINISHED");
  const lastSprintTasks = await lastSprint.getTasks();
  let resultSprint = nextSprint;
  await lastSprint.update({ status: "FINISHED" });
  resultSprint = await resultSprint.addTasks(lastSprintTasks);
  resultSprint = await resultSprint.update({ status: "CURRENT" });
  res.status(200).send(resultSprint);
};

module.exports = { endSprint, startSprint };

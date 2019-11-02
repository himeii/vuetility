const Project = require("../projectModel");

async function getProject(req, res, next) {
  const { params } = req;
  const { id } = params;
  const project = await Project.findByPk(id);
  if (!project) {
    return res.status(404).send({ message: "No such project" });
  }
  req.project = project;
  return next();
}

module.exports = getProject;

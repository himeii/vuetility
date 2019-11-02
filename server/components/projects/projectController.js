const Joi = require("joi");
const Project = require("./projectModel");

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

module.exports = {
  createProject,
  deleteProject,
  editProject,
  getByID,
  getAll,
};

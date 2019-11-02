function scrumMasterOnly(req, res, next) {
  const { currentUser, project } = req;
  const scrumMaster = project.get("scrumMaster");
  if (scrumMaster === currentUser.get("id")) {
    return next();
  }
  return res.status(401).send({ message: "This action is only permissible for scrum master" });
}

module.exports = scrumMasterOnly;

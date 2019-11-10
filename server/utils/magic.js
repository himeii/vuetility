const User = require("../components/users/userModel");
const Project = require("../components/projects/projectModel");
const Sprint = require("../components/sprints/sprintModel");
const Task = require("../components/tasks/taskModel");

function magic(...models) {
  models.forEach((model) => {
    console.log(`${model.name} magic`, Object.keys(model.prototype));
  });
}


module.exports = () => magic(User, Project, Sprint, Task);

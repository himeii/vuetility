const bcrypt = require("bcrypt");
const User = require("../components/users/userModel");
const Project = require("../components/projects/projectModel");
const Team = require("../components/team/teamModel");
const Sprint = require("../components/sprints/sprintModel");
const Task = require("../components/tasks/taskModel");
const Comment = require("../components/comments/commentModel");
const TaskSprint = require("../components/taskSprints/taskSprintModel");

const test = async () => {
  const pass = await bcrypt.hash("sometestpass", 8);
  const user = await User.create({
    firstName: "Sergey",
    lastName: "Breus",
    email: "serbr2010@gmail.com",
    password: pass,
  });
  // console.log(Object.keys(User.prototype), "USER MAGIC");

  const project = await Project.create({
    name: "New Project",
  });

  // project.setScrumMaster(user).then((ent) => console.log("set", ent)).catch((err) => console.log(err, "err"));
  // project.getScrumMaster().then((user) => console.log(user.get(), "user"));
  console.log(Object.keys(Project.prototype), "PROJECT MAGIC");
  // console.log(Object.keys(Task.prototype), "TASK MAGIC");
  // console.log(Object.keys(Sprint.prototype), "SPRINT MAGIC");
  // console.log(Object.keys(Comment.prototype), "COMMENT MAGIC");
  // console.log(project.get(), "project");
};

test();

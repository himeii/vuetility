const User = require("../components/users/userModel");
const Project = require("../components/projects/projectModel");
const Team = require("../components/team/teamModel");
const Sprint = require("../components/sprints/sprintModel");
const Task = require("../components/tasks/taskModel");
const Comment = require("../components/comments/commentModel");
const TaskSprint = require("../components/taskSprints/taskSprintModel");

// User relations

User.belongsToMany(Project, { through: Team });
User.hasMany(Project, { as: "scrumMaster" });
User.hasMany(Task);

// Project relations

Project.belongsToMany(User, { through: Team });
Project.hasMany(Sprint);
Project.belongsTo(User, { as: "scrumMaster" });

// Sprint relations

Sprint.hasMany(Task);
Sprint.belongsTo(Project);

// Task relations

Task.belongsTo(User, { as: "reporter" });
Task.belongsTo(User, { as: "assignee" });
Task.hasMany(Comment);
Task.belongsTo(Sprint, { through: TaskSprint });

// Comment relations

Comment.belongsTo(Task);

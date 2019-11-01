const User = require("../components/users/userModel");
const Project = require("../components/projects/projectModel");
const Team = require("../components/team/teamModel");
const Sprint = require("../components/sprints/sprintModel");
const Task = require("../components/tasks/taskModel");
const Comment = require("../components/comments/commentModel");
const TaskSprint = require("../components/taskSprints/taskSprintModel");

// User relations

User.hasOne(Project, { as: "scrumMaster" });
User.hasOne(Task, { as: "reporter" });
User.hasOne(Task, { as: "assignee" });
User.belongsToMany(Project, { through: Team });

// Project relations

Project.belongsToMany(User, { through: Team });
Project.hasMany(Sprint);

// Sprint relations

Sprint.belongsToMany(Task, { through: TaskSprint });
Sprint.belongsTo(Project);

// Task relations

Task.hasMany(Comment);
Task.belongsToMany(Sprint, { through: TaskSprint });

// Comment relations

Comment.belongsTo(Task);

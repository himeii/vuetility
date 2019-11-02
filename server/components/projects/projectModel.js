const { SQL, Sequelize } = require("../../config/db");

const projectStatuses = [
  "STARTED",
  "POSTPONED",
  "FINISHED",
];

const Project = SQL.define("project", {
  id: {
    primaryKey: true,
    allowNull: false,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  name: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  startDate: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Date.now,
  },
  endDate: Sequelize.DATE,
  status: { type: Sequelize.ENUM(projectStatuses), defaultValue: "STARTED" },
});

module.exports = Project;

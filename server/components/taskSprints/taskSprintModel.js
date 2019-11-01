const { SQL, Sequelize } = require("../../config/db");

const TaskSprint = SQL.define("taskSprint", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
});

module.exports = TaskSprint;

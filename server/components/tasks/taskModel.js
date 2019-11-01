const { SQL, Sequelize } = require("../../config/db");
const DBTypes = require("../../utils/commonTypes");

const taskStatuses = ["TO DO", "IN PROGRESS", "IN REVIEW", "TESTING", "DONE"];

const Task = SQL.define("task", {
  id: DBTypes.ID,
  name: DBTypes.NAME,
  description: Sequelize.STRING,
  estimate: Sequelize.INTEGER,
  time_tracked: Sequelize.INTEGER,
  status: {
    type: Sequelize.ENUM(taskStatuses),
    allowNull: false,
    defaultValue: "TO DO",
  },
});

module.exports = Task;

const { SQL, Sequelize } = require("../../config/db");
const DBTypes = require("../../utils/commonTypes");

const sprintStatuses = ["UPCOMING", "CURRENT", "FINISHED"];

const Sprint = SQL.define("sprint", {
  id: DBTypes.ID,
  start_date: DBTypes.DATE_FROM_NOW,
  end_date: Sequelize.DATE,
  status: {
    type: Sequelize.ENUM(sprintStatuses),
    defaultValue: "UPCOMING",
  },
  number: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
  },
});

module.exports = Sprint;

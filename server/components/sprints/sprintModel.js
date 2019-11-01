const { SQL, Sequelize } = require("../../config/db");
const DBTypes = require("../../utils/commonTypes");

const Sprint = SQL.define("sprint", {
  id: DBTypes.ID,
  start_date: DBTypes.DATE_FROM_NOW,
  end_date: Sequelize.DATE,
});

module.exports = Sprint;

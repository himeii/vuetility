const { SQL, Sequelize } = require("../../config/db");

const Team = SQL.define("team", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
});

module.exports = Team;

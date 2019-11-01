const { Sequelize } = require("../config/db");

const DBTypes = {
  ID: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  DATE_FROM_NOW: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Date.now(),
  },
  NAME: {
    type: Sequelize.STRING,
    allowNull: false,
  },
};

module.exports = DBTypes;

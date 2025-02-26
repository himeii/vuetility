
const Sequelize = require("sequelize");

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable("Users", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    avatar: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true,
      },
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable("Users"),
};

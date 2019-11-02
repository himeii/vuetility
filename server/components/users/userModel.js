const { SQL, Sequelize } = require("../../config/db");

const User = SQL.define("user", {
  id: {
    allowNull: false,
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
  password: {
    type: Sequelize.STRING,
    validate: {
      min: 8, max: 32,
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
}, {
  scopes: {
    withoutPassword: {
      attributes: {
        exclude: ["password"],
      },
    },
  },
});

module.exports = User;

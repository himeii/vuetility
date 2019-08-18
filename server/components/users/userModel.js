const { SQL, Sequelize } = require("../../config/db");

const User = SQL.define("user", {
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
});

User.sync({ force: true }).then(() => {
  User.create({ firstName: "John", lastName: "Hancock" });
});

module.exports = User;

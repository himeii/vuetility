const Sequelize = require("sequelize");

const SQL = new Sequelize.Sequelize("vuetility", "postgres", "root", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});


module.exports = { SQL, Sequelize };

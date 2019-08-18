const Sequelize = require("sequelize");

const SQL = new Sequelize.Sequelize("vuetility", "postgres", "root", {
  host: "localhost",
  dialect: "postgres",
});


module.exports = { SQL, Sequelize };

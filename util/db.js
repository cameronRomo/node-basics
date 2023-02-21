const Sequelize = require("sequelize");

const PASSWORD = process.env.MYSQL_PASSWORD;
const sequelize = new Sequelize("node-complete", "root", PASSWORD, {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;

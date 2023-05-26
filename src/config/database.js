const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL);

/*const sequelize = new Sequelize("cookolisto-db","mysql", "6d1bd742a95e744", {
    host:"dokku-mysql-cookolisto-db",
    port:3306,
    dialect: "mysql",
    //logging: false
  });*/

module.exports = sequelize;
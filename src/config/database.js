const { Sequelize } = require('sequelize');

const url_db = process.env.DATABASE_URL
//console.log("iciiiiiiiiiiiii" + url_db);
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    //host:"dokku-mysql-cookolisto-db",
    //port:3306,
    dialect: "mysql",
});

/*const sequelize = new Sequelize("cookolisto-db","mysql", "6d1bd742a95e744", {
    host:"dokku-mysql-cookolisto-db",
    port:3306,
    dialect: "mysql",
    //logging: false
  });*/

module.exports = sequelize;
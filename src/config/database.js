const { Sequelize } = require('sequelize');

const url_db = process.env.DATABASE_URL || "mysql://amel:mdp@localhost:3306/cookolisto";
//console.log("iciiiiiiiiiiiii" + url_db);
/*const sequelize = new Sequelize(process.env.DATABASE_URL, {
    //host:"dokku-mysql-cookolisto-db",
    //port:3306,
    dialect: "mysql",
});*/

const sequelize = new Sequelize(url_db)


module.exports = sequelize;
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mysql://mysql:0d7af7dad2d19284@dokku-mysql-cooko-db:3306/cooko_d')

module.exports = sequelize;
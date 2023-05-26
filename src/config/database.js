const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mysql://amel:mdp@localhost:3306/cookolisto')

module.exports = sequelize;
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.MDP);

module.exports = sequelize;
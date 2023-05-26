const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.MDP, {
    dialect: 'mysql',
  });

module.exports = sequelize;
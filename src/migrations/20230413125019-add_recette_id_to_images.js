'use strict';

const {DataTypes} = require("sequelize");
const Sequelize = require('../config/database')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
        'images',
        'recetteId',
        {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'recettes',
            key: 'id'
          }
        }
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('images', 'recetteId');
  }
};

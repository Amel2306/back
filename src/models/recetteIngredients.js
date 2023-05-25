const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Ingredient = require('./Ingredient');
const Recette = require('./Recette');

const IngredientRecette = sequelize.define('ingredient_recette', {
  quantite: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  uniteQte: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Définition de la clé primaire composée
  primaryKey: true,
  unique: true,
  scope: {
    ingredientId: {
      type: DataTypes.INTEGER,
      references: {
        model: Ingredient,
        key: 'id'
      }
    },
    recetteId: {
      type: DataTypes.INTEGER,
      references: {
        model: Recette,
        key: 'id'
      }
    }
  }
});

Ingredient.belongsToMany(Recette, { through: IngredientRecette });
Recette.belongsToMany(Ingredient, { through: IngredientRecette });

module.exports = IngredientRecette;
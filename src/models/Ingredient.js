const { DataTypes } = require('sequelize');
const sequelize = require ('../config/database') // permet à sequilize d'acceder a la config de notre base de données
const TypeIngredient = require('./TypeIngredient')

const Ingredient = sequelize.define('ingredient', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tingredient: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'type_ingredients',
            key: 'id'
        }
    }
})

module.exports = Ingredient;

/*Ingredient.belongsTo(TypeIngredient ,{foreignKey:'tingredient'})
TypeIngredient.hasMany(Ingredient);*/


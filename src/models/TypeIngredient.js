const { DataTypes } = require('sequelize');
const sequelize = require ('../config/database') // permet à sequilize d'acceder a la config de notre base de données

const TypeIngredient = sequelize.define('type_ingredient', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = TypeIngredient;

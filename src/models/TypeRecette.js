const { DataTypes } = require('sequelize');
const sequelize = require ('../config/database') // permet à sequilize d'acceder a la config de notre base de données


const TypeRecette = sequelize.define('type_recette', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [["Entrée", "Plat", "Dessert", "Autre"]]
        }
    }
});

module.exports = TypeRecette; // Exporter le modèle
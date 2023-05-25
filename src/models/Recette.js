const { DataTypes } = require('sequelize');
const sequelize = require ('../config/database') // permet à sequilize d'acceder a la config de notre base de données

const Recette = sequelize.define('recette', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    difficulte: {
        type: DataTypes.INTEGER,
        validate: {
            isIn: [[1,2,3,4,5]]
        },
        allowNull: false
    },
    "temps_prep": {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    proprio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    categorie: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'type_recettes',
            key: 'id'
        }
    }
})

/*Recette.belongsTo(User, { foreignKey: 'proprio' });
User.hasMany(Recette)

Recette.belongsTo(TypeRecette, {foreignKey: 'categorie'});
TypeRecette.hasMany(Recette)*/

module.exports = Recette;





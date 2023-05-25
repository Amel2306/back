const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User')
const Recette = require('./Recette');

const Panier = sequelize.define('panier', {
    quantite: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    // Définition de la clé primaire composée
    primaryKey: true,
    unique: true,
    scope: {
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
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

User.belongsToMany(Recette, { through: Panier });
Recette.belongsToMany(User, { through: Panier });

module.exports = Panier;
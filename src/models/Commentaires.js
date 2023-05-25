const { DataTypes } = require('sequelize');
const db = require('../config/database');
const Recette = require('./Recette');
const User = require('./User');

const Commentaire = db.define('Commentaire', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    contenu: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    note: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
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
});

Commentaire.belongsTo(Recette);
Recette.hasMany(Commentaire);

Commentaire.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Commentaire, { foreignKey: 'recetteId' });

module.exports = Commentaire;
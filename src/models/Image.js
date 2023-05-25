const { DataTypes} = require("sequelize")
const sequelize = require("../config/database")
const Recette = require("./Recette")

const Image = sequelize.define('image', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    filename: {
        type: DataTypes.STRING,
        allowNull: false
    },
    filepath: {
        type: DataTypes.STRING,
        allowNull: false
    },
    recetteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'recettes',
            key: 'id'
        }
    }
});

module.exports = Image;

Image.belongsTo(Recette ,{foreignKey:'recetteId'})
Recette.hasMany(Image)



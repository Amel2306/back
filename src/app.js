const express = require('express');
const helmet = require('helmet');

const usersRoute = require('./routes/usersRoutes');
const recetteRoute = require('./routes/recettesRoutes')
const typeRecRoute = require('./routes/type_recetteRoutes')
const images = require('./routes/imagesRoutes')
const authentification = require('./routes/authRoutes')
const typeIngredient = require('./routes/type_ingredientRoutes')
const ingredient = require('./routes/ingredientsRoutes')

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//pour gérer les erreurs
const notFoundErrorHandler = require('./middlewares/errors-handlers/notFoundErrorHandler');
const genericErrorHandler = require('./middlewares/errors-handlers/genericErrorHandler');


app.use(helmet());
// Exlication du fonction de .json() et .urlencoded() : https://stackoverflow.com/a/51844327
app.use(express.json()); // Transforme les requêtes entrantes JSON en objet JS
app.use(express.urlencoded({ extended: true })); // Permet de lire les données des strings dans les requêtes entrantes


//  route pour acceder aux routes qu'on peut utiliser

// les tables de base de données
app.use('/typerecettes',typeRecRoute );
app.use('/images', images)
app.use('/users', usersRoute);
app.use('/recettes', recetteRoute);
app.use('/ingredients', ingredient);
app.use('/typeingredients', typeIngredient);

// les routes pour l'authentification
app.use('/authentification', authentification);


module.exports = app;
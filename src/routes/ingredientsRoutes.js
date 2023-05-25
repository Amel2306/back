const express = require('express');
const router = express.Router();
const ingredientController = require('../controllers/ingredientController');
const recetteIngredientController = require("../controllers/recetteIngredientsControllers");


router.get('/', ingredientController.getAllIngredients);
router.get('/:id', ingredientController.getIngredient);
router.post('/', ingredientController.createIngredient);
router.put('/:id', ingredientController.updateIngredient);
router.delete('/:id', ingredientController.deleteIngredient);
router.get('/:nom/recettes', recetteIngredientController.getIngredientsWithRecettes)

module.exports = router;


const express = require('express');
const router = express.Router();
const typeIngredientController = require('../controllers/type_ingredientController');

router.get('/', typeIngredientController.getAllTypeIngredients);
router.get('/:nom', typeIngredientController.getTypeIngredientName);
router.get('/:id', typeIngredientController.getTypeIngredient);
router.post('/', typeIngredientController.createTypeIngredient);
router.put('/:id', typeIngredientController.updateTypeIngredient);
router.delete('/:id', typeIngredientController.deleteTypeIngredient);

module.exports = router;
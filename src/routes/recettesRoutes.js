const express = require('express');
const recetteController = require('../controllers/recettesController');
const auth= require('../middlewares/authMiddle')
const recetteIngredientController = require("../controllers/recetteIngredientsControllers");
const commentairesController = require("../controllers/commentairesController")

const router = express.Router();

router.get('/', recetteController.getAllRecettes);
router.get('/:id', recetteController.getRecette);
router.post('/', auth.auth, recetteController.createRecette);
router.post('/:id/ingredient', auth.auth, recetteIngredientController.postIngredient);
router.put('/:id/ingredient', auth.auth, recetteIngredientController.updateIngredient);
router.put('/:id', auth.auth, recetteController.updateRecette);
router.delete('/:id', auth.auth, recetteController.deleteRecette);
router.get('/:id/image' , recetteController.getImageRec);
router.get('/:id/ingredients', recetteIngredientController.getIngredientsByRecette);
router.get('/:id/commentaire', commentairesController.getCommentairesByRecette);
router.post('/:id/commentaire', auth.auth, commentairesController.addCommentaire);
router.put('/:commentaireId/commentaire', auth.auth, commentairesController.updateCommentaire);
router.delete('/:commentaireId/commentaire', auth.auth, commentairesController.deleteCommentaire);

module.exports = router;
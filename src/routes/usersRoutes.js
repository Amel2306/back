const express = require('express');
const usersControllers = require('../controllers/usersController');
const PanierController = require("../controllers/panierController");
const authMidlle= require('../middlewares/authMiddle')

const router = express.Router();

// les routes de base
router.get('/', authMidlle.auth, authMidlle.isAdmin, usersControllers.getAllUsers);
router.get('/:id', usersControllers.getUserById);
router.post('/', usersControllers.createUser);
router.put('/:id', usersControllers.updateUser);
router.delete('/:id', usersControllers.deleteUser);
router.get('/:id/panier', authMidlle.auth,PanierController.getAllRecettesPanier);
router.post('/:id/panier', authMidlle.auth, PanierController.ajouterRecetteAuPanier);
router.put('/:id/panier', authMidlle.auth, PanierController.supprimerRecetteDuPanier);
router.get('/:id/panier/tri', authMidlle.auth,PanierController.getAllRecettesPanierTri);
router.get(":id/panier/ingredients", PanierController.getIngredientsFromPanier);
module.exports = router;


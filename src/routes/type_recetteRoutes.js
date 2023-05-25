const express = require ("express");
const typeController = require ("../controllers/type_recetteController")

const router = express.Router();

router.get('/', typeController.getAllTypeRecettes)
router.get('/id', typeController.getTypeRecette)
router.post('/', typeController.postTypeRecette)
router.put('/id', typeController.updateTypeRecette)
router.delete('/id', typeController.deleteTypeRecette)

module.exports = router;



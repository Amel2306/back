const express = require('express');
const imagesController = require('../controllers/imagesController');

const router = express.Router()

router.post('/', imagesController.createImage);
router.get('/', imagesController.getAllImages);
router.get('/:id', imagesController.getImage);
router.put('/:id', imagesController.updateImage);
router.delete('/:id', imagesController.deleteImage);

module.exports = router;
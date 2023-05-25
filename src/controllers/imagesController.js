const  Image  = require('../models/Image');

// Récupérer toutes les images
exports.getAllImages = async (req, res, next) => {
    try {
        const images = await Image.findAll();
        res.status(200).json(images);
    } catch (error) {
        next(error);
    }
};

// Récupérer une image par son id
exports.getImage = async (req, res) => {
    try {
        const image = await Image.findByPk(req.params.id);
        if (!image) {
            res.status(404).json({ message: `Image not found` });
        }
        res.status(200).json(image);
    } catch (error) {
        res.status(400).json({ message:'Not found'});
    }
};

// Ajouter une nouvelle image
exports.createImage = async (req, res, next) => {
    try {
        const { filename, filepath, recetteId } = req.body;
        const newImage = await Image.create({ filename, filepath, recetteId });
        res.status(201).json(newImage);
    } catch (error) {
        res.status(400).json({message: "probleme image not added"});
    }
};

// Mettre à jour une image existante
exports.updateImage = async (req, res, next) => {
    try {

        const { filename, filepath, recetteId } = req.body;
        const image = await Image.findByPk(req.params.id);
        if (!image) {
            res.status(404).json({ message: `Image not found` });
        }
        image.filename = filename;
        image.filepath = filepath;
        image.recetteId = recetteId;
        const updatedImage = await image.save();
        res.status(200).json(updatedImage);
    } catch (error) {
        res.status(400).json({message: "probleme image not updated"});
    }
};

// Supprimer une image existante
exports.deleteImage = async (req, res, next) => {
    try {
        const image = await Image.findByPk(req.params.id);
        if (!image) {
            return res.status(404).json({ message: `Image with id not found` });
        }
        await image.destroy();
        res.status(204).json();
    } catch (error) {
        res.status(400).json({message: "probleme image not deleted"});
    }
};





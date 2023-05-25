const Commentaire = require('../models/Commentaires');
const Recette = require('../models/Recette');
const User = require("../models/User");

// Obtenir tous les commentaires
exports.getAllCommentaires = async (req, res) => {
    try {
        const commentaires = await Commentaire.findAll();
        res.status(200).json(commentaires);
    } catch (error) {
        res.status(500).json({ message: 'Une erreur s\'est produite lors de la récupération des commentaires.', error });
    }
};

exports.getCommentairesByRecette = async (req, res) => {
    const recetteId = req.params.id;

    try {
        const commentaires = await Commentaire.findAll({ where: { recetteId } });
        res.status(200).json(commentaires);
    } catch (error) {
        res.status(500).json({ message: 'Une erreur s\'est produite lors de la récupération des commentaires de la recette.', error });
    }
};

exports.addCommentaire = async (req, res) => {
    const recetteId = req.params.id;
    const { contenu, note, userId } = req.body;

    try {
        const recette = await Recette.findByPk(recetteId);
        if (!recette) {
            return res.status(404).json({ message: 'La recette n\'existe pas.' });
        }
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'L\'utilisateur n\'existe pas.' });
        }
        const commentaire = await Commentaire.create({ contenu, note, recetteId, userId });
        res.status(201).json(commentaire);
    } catch (error) {
        res.status(500).json({ message: 'Une erreur s\'est produite lors de l\'ajout du commentaire.', error });
    }
};

// Mettre à jour un commentaire
exports.updateCommentaire = async (req, res) => {
    const commentaireId = req.params.commentaireId;
    const { contenu, note } = req.body;

    try {
        // Vérifier si le commentaire existe
        const commentaire = await Commentaire.findByPk(commentaireId);
        if (!commentaire) {
            return res.status(404).json({ message: 'Le commentaire n\'existe pas.' });
        }

        // Mettre à jour le commentaire
        commentaire.contenu = contenu;
        commentaire.note = note;
        await commentaire.save();

        res.status(200).json(commentaire);
    } catch (error) {
        res.status(500).json({ message: 'Une erreur s\'est produite lors de la mise à jour du commentaire.', error });
    }
};

exports.deleteCommentaire = async (req, res) => {
    const commentaireId = req.params.commentaireId;
    try {
        // Vérifier si le commentaire existe
        const commentaire = await Commentaire.findByPk(commentaireId);
        if (!commentaire) {
            return res.status(404).json({ message: 'Le commentaire n\'existe pas.' });
        }

        // Supprimer le commentaire
        await commentaire.destroy();

        res.status(200).json({ message: 'Le commentaire a été supprimé avec succès.' });
    } catch (error) {
        res.status(500).json({ message: 'Une erreur s\'est produite lors de la suppression du commentaire.', error });
    }
};
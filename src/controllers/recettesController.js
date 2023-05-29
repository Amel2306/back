const Recette = require('../models/Recette')
const Image = require('../models/Image')
const TypeIgredients = require('../models/TypeIngredient');
const Ingredient = require ("../models/Ingredient")
const RecetteIngredients = require ("../models/recetteIngredients")

exports.getAllRecettes = async (req,res) => {
    const recettes = await Recette.findAll();
    res.json(recettes)
};

exports.getRecette = async (req, res) => {
    const recette = await Recette.findByPk(req.params.id);

    if (recette) {
        res.json(recette)
    }
    else {
        res.status(404).json({message: 'recette non trouvé' });
    }
}

exports.createRecette = async (req, res) => {
    const {nom, description, difficulte, proprio, temps_prep, categorie} = req.body;
    const userId = req.user.id;

    if (proprio !== userId) {
        return res.status(401).json({ message: 'Vous n\'êtes pas autorisé à créer une recette, il faut être connecter pour cela' });
    }

    try {
        const newRecette = await Recette.create ({nom, description, difficulte, proprio, temps_prep,  categorie});
        res.status(201).json(newRecette);
    } catch (error) {
        res.status(400).json({ message: 'Error lors de la création d\'une recette', error });
    }
}

exports.updateRecette = async (req, res) => {
    const { nom, description, difficulte, temps_prep, categorie } = req.body;
    const recetteId = req.params.id;

    try {
        const recette = await Recette.findOne({ where: { id: recetteId } });

        if (!recette) {
            return res.status(404).json({ message: 'Recette not found' });
        }

        if (recette.proprio !== req.user.id) {
            return res.status(403).json({ message: 'You are not authorized to update this recette' });
        }

        const updateRaws = await Recette.update(
            { nom, description, difficulte, temps_prep, categorie },
            { where: { id: recetteId } }
        );

        if (updateRaws > 0) {
            res.status(200).json({ message: 'recette bien modifiée' });
        } else {
            res.status(404).json({ message: 'recette non modifiée' });
        }
    } catch (error) {
        res.status(400).json({ message: "Une erreur s'est produite lors de la modification de la recette", error });
    }
};

exports.deleteRecette = async (req, res) => {
    const recetteId = req.params.id;

    try {
        const recette = await Recette.findOne({where: {id: recetteId}});

        if (!recette) {
            return res.status(404).json({message: "La recette n'existe pas"});
        }

        if (recette.proprio !== req.user.id) {
            return res.status(403).json({message: "Vous n'êtes pas autorisé à supprimer cette recette"});
        }

        const deletedRaws = await Recette.destroy({where: {id: recetteId}});

        if (deletedRaws > 0) {
            res.status(200).json({message: 'la recette a bien été supprimée'})
        } else {
            res.status(404).json({message: 'la recette n\'a pas été supprimée '});
        }
    } catch (error) {
        res.status(400).json({message: "une erreur s'est produite lors de la suppression d'une recette", error})
    }
};

exports.getImageRec = async (req, res) => {
    const idRecette = req.params.id;
    try {
        const image = await Image.findAll({
            where: {
                recetteId: idRecette
            }
        });
        //const imagePaths = image.map(image => image.filepath);
        res.json(image);
    } catch (error) {
        res.json(error);
    }
};

exports.getRecettesByTypeIngredients = async (req, res) => {
    const categorie = req.params.catIngredient;

    const recettesCat = new Set();

    try {
        const typeIngredient = await TypeIgredients.findOne({
            where: {
                nom: categorie
            }
        });

        if (typeIngredient) {
            const ingredients = await Ingredient.findAll({
                where: {
                    tingredient: typeIngredient.id
                }
            });

            for (const ingredient of ingredients) {
                const recettes = await RecetteIngredients.findAll({
                    where: {
                        ingredientId: ingredient.id
                    }
                });

                for (const recette of recettes) {
                    recettesCat.add(recette.recetteId);
                }
            }

            res.json(Array.from(recettesCat)); // Convertit le Set en Array avant de l'envoyer en réponse JSON
        } else {
            res.status(404).json({ message: 'Type d\'ingrédient non trouvé' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la récupération des recettes par type d\'ingrédient', error: err });
    }
};
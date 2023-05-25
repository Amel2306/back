const IngredientRecette = require('../models/recetteIngredients');
const Ingredient = require('../models/Ingredient');
const Recette = require('../models/Recette');


exports.postIngredient = async (req, res) => {
    const { quantite, uniteQte, ingredientId } = req.body;
    const recetteId = req.params.id;

    // Vérifier que la recette existe
    const recette = await Recette.findByPk(recetteId);
    if (!recette) {
        return res.status(404).json({ message: 'Recette non trouvée' });
    }

    // Vérifier que l'ingrédient existe
    const ingredient = await Ingredient.findByPk(ingredientId);
    if (!ingredient) {
        return res.status(404).json({ message: 'Ingrédient non trouvé' });
    }

    try {
        const newIngredientRecette = await IngredientRecette.create({
            quantite,
            uniteQte,
            ingredientId,
            recetteId,
        });

        res.status(201).json(newIngredientRecette);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création de l\'ingrédient de la recette.' });
    }
};

exports.updateIngredient= async (req, res) =>  {
    const recetteId = req.params.id;
    const ingredientId = req.body.ingredientId;

// Mettre à jour la quantité et l'unité de quantité pour l'ingrédient dans la recette
    const quantite = req.body.quantite;
    const uniteQte = req.body.uniteQte;

    const updatedRows = await IngredientRecette.update(
        { quantite, uniteQte },
        { where: { recetteId, ingredientId } }
    );

// Vérifier si une ligne a été mise à jour
    if (updatedRows[0] === 0) {
        // Si aucune ligne n'a été mise à jour, renvoyer une erreur
        return res.status(404).json({ message: "L'ingredient n'est pas présent dans la recette" });
    }

// Si une ligne a été mise à jour, renvoyer la réponse
    return res.json({ message: "La quantité de l'ingredient a été mise à jour avec succès" });
};

// Récupère tous les ingrédients avec leurs recettes associées
exports.getIngredientsWithRecettes = async (req, res) => {
    try {
        const nomIngredient = req.params.nom;
        // Récupère tous les ingrédients avec leurs recettes associées via le modèle IngredientRecette
        const ingredients = await Ingredient.findAll({
            where: { nom: nomIngredient },
            include: {
                model: Recette,
                through: {
                    model: IngredientRecette,
                    attributes: ['quantite']
                }
            }
        });
        res.status(200).json({ ingredients : ingredients });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Récupère toutes les recettes avec leurs ingrédients associés
exports.getRecettesWithIngredients = async (req, res) => {
    try {
        // Récupère toutes les recettes avec leurs ingrédients associés via le modèle IngredientRecette
        const recettes = await Recette.findAll({
            include: {
                model: Ingredient,
                through: {
                    model: IngredientRecette,
                    attributes: ['quantite']
                }
            }
        });
        res.status(200).json({ recettes });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

exports.getIngredientsByRecette = async (req, res) => {
    try {
        const idRec = req.params.id;
        const ingredients = await IngredientRecette.findAll({
            attributes: ['ingredientId', 'quantite', 'uniteQte', "recetteId"], // Inclure uniquement l'id et le nom de l'ingrédient
            where: { recetteId: idRec }
        });
        res.status(200).json({ ingredients });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};
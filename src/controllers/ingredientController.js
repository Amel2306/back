const Ingredient = require ('../models/Ingredient')
const TypeIngredient = require("../models/TypeIngredient");

exports.getAllIngredients  = async (req, res, next) => {
    try {
        const ingredients = await Ingredient.findAll();
        res.status(200).json(ingredients);
    } catch (error) {
        next(error);
    }
};

exports.getIngredient = async (req, res) => {
    try {
        const ingredient = await Ingredient.findByPk(req.params.id);
        if (!ingredient) {
            res.status(404).json({ message: `Ingredient not found` });
        }
        res.status(200).json( ingredient);
    } catch (error) {
        res.status(400).json({ message:'Not found'});
    }
};

exports.createIngredient = async (req, res, next) => {
    try {
        const { nom, tingredient} = req.body;
        //dans le cas ou le nom de l'ingredient existe déja ça ne sert à rien de le rajouter
        const [ingredient, created] = await Ingredient.findOrCreate({
            where: { nom, tingredient },
        });
        if (created) {
            res.status(201).json({ ingredient });
        } else {
            res.status(409).json({ error: 'Ingredient already exists' });
        }
    } catch (err) {
        next(err);
    }
};

exports.updateIngredient = async (req, res, next) => {
    try {
        const { nom } = req.body;
        const { id } = req.params;
        const ingredient = await Ingredient.findByPk(id);
        if (!ingredient) {
            return res.status(404).json({ message: 'Ingrédient non trouvé.' });
        }
        await ingredient.update({ nom });
        res.status(200).json({ ingredient });
    } catch (err) {
        next(err);
    }
}

exports.deleteIngredient = async (req, res, next) => {
    try {
        const { id } = req.params;
        const ingredient = await Ingredient.findByPk(id);
        if (!ingredient) {
            return res.status(404).json({ message: 'Ingrédient non trouvé.' });
        }
        await ingredient.destroy();
        res.status(204).end();
    } catch (err) {
        next(err);
    }
};
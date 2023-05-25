const TypeIngredient = require('../models/TypeIngredient');


exports.getAllTypeIngredients = async (req, res, next) => {
    try {
        const typeIngredients = await TypeIngredient.findAll();
        res.status(200).json({ typeIngredients });
    } catch (err) {
        next(err);
    }
};

exports.getTypeIngredient = async (req, res, next) => {
    try {
        const { id } = req.params;
        const typeIngredient = await TypeIngredient.findByPk(id);
        if (!typeIngredient) {
            return res.status(404).json({ message: 'Type d\'ingrédient non trouvé.' });
        }
        res.status(200).json({ typeIngredient });
    } catch (err) {
        next(err);
    }
};

exports.getTypeIngredientName = async (req, res, next) => {
    try {
        const { nom } = req.params;
        const typeIngredient = await TypeIngredient.findByPk(nom);
        if (!typeIngredient) {
            return res.status(404).json({ message: 'Type d\'ingrédient non trouvé.' });
        }
        res.status(200).json({ typeIngredient });
    } catch (err) {
        next(err);
    }
};

exports.createTypeIngredient = async (req, res, next) => {
    try {
        const { nom } = req.body;
        const typeIngredient = await TypeIngredient.create({ nom });
        res.status(201).json({ typeIngredient });
    } catch (err) {
        next(err);
    }
};

exports.updateTypeIngredient = async (req, res, next) => {
    try {
        const { nom } = req.body;
        const { id } = req.params;
        const typeIngredient = await TypeIngredient.findByPk(id);
        if (!typeIngredient) {
            return res.status(404).json({ message: 'Type d\'ingrédient non trouvé.' });
        }
        await typeIngredient.update({ nom });
        res.status(200).json({ typeIngredient });
    } catch (err) {
        next(err);
    }
};

exports.deleteTypeIngredient = async (req, res, next) => {
    try {
        const { id } = req.params;
        const typeIngredient = await TypeIngredient.findByPk(id);
        if (!typeIngredient) {
            return res.status(404).json({ message: 'Type d\'ingrédient non trouvé.' });
        }
        await typeIngredient.destroy();
        res.status(204).end();
    } catch (err) {
        next(err);
    }
};





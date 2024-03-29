const Panier = require('../models/Panier')
const Recette = require("../models/Recette");
const User = require("../models/User");
const {where} = require("sequelize");
const IngredientRecette = require("../models/recetteIngredients");
const Ingredient = require("../models/Ingredient");
const TypeIngredient = require("../models/TypeIngredient");


// Récupérer toutes les recettes dans le panier
exports.getAllRecettesPanier = async (req, res, next) => {
    const userId = req.params.id;
    try {
        const panier = await Panier.findAll({where:{userId : userId}});
        res.status(200).json({panier: panier});
    } catch (error) {
        res.status(404).json(error);
    }
};

exports.ajouterRecetteAuPanier = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const { recetteId, quantite } = req.body;

        // Vérifier si la recette existe
        const recette = await Recette.findByPk(recetteId);
        if (!recette) {
            return res.status(404).json({ message: "La recette n'existe pas" });
        }

        // Vérifier si l'utilisateur existe
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "L'utilisateur n'existe pas" });
        }

        // Ajouter la recette au panier de l'utilisateur
        const [panier, created] = await Panier.findOrCreate({
            where: { userId, recetteId },
            defaults: { quantite },
        });

        if (!created) {
            // Si le panier pour cette recette existe déjà pour l'utilisateur, on ajoute simplement la quantité
            panier.quantite += quantite;
            await panier.save();
        }

        res.status(201).json({ message: "Recette ajoutée au panier avec succès" });
    } catch (error) {
        next(error);
    }
};

exports.supprimerRecetteDuPanier = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const  {recetteId} = req.body;

        // Vérifier si la recette existe
        const recette = await Recette.findByPk(recetteId);
        if (!recette) {
            return res.status(404).json({ message: "La recette n'existe pas" });
        }

        // Vérifier si l'utilisateur existe
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "L'utilisateur n'existe pas" });
        }

        // Récupérer le panier pour cette recette et cet utilisateur
        const panier = await Panier.findOne({ where: { userId, recetteId } });
        if (!panier) {
            return res.status(404).json({ message: "La recette n'est pas dans le panier de l'utilisateur" });
        }

        // Si la quantité est supérieure à 1, on soustrait 1 de la quantité existante du panier
        if (panier.quantite > 1) {
            panier.quantite -= 1;
            await panier.save();
        } else {
            // Si la quantité est égale à 1, on supprime complètement le panier pour cette recette et cet utilisateur
            await panier.destroy();
        }

        res.status(200).json({ message: "Recette supprimée du panier avec succès" });
    } catch (error) {
        next(error);
    }
};

// Récupérer toutes les recettes dans le panier avec la somme des quantités par ingrédient
exports.getAllRecettesPanierTri = async (req, res, next) => {
    const userId = req.params.id;
    try {
        const panier = await Panier.findAll({
            where: { userId: userId },
            include: [
                {
                    model: Recette
                },
                {
                    model: Ingredient,
                    attributes: ['nom'],
                    include: {
                        model: TypeIngredient,
                        attributes: ['nom'],
                    },
                },
            ],
            attributes: [
                [sequelize.fn('SUM', sequelize.col('ingredient_recettes.qte')), 'total_qte'],
                'nom',
                'type_ingredient.nom',
            ],
            group: ['ingredient.nom', 'type_ingredient.nom', 'ingredient.ingredientId'],
        });
        res.status(200).json({ panier: panier });
    } catch (error) {
        res.status(404).json(error);
    }
};

exports.getMesIngredientsPanier = async (req, res) => {
    const userId = req.params.id; // Récupérer l'ID de l'utilisateur depuis les paramètres de la requête

    try {
      // Récupérer les recettes associées au panier pour l'utilisateur donné
      const panier = await Panier.findAll({
        where: { userId },
      });
  
      const ingredientsWithQuantities = {};
  
      // Parcourir les recettes et récupérer les ingrédients associés avec leurs quantités
      for (const item of panier) {
        const recette = item.recetteId;
  
        // Récupérer les ingrédients associés à la recette avec les quantités
        const ingredientsRecette = await IngredientRecette.findAll({
          where: { recetteId: recette },
        });
  
        // Ajouter les ingrédients avec leurs quantités au tableau résultant
        for (const ingredientRecette of ingredientsRecette) {
          const ingredient = ingredientRecette.ingredientId;
          const quantite = ingredientRecette.quantite;
          const uniteQte = ingredientRecette.uniteQte;
            const ingredientComplet = await Ingredient.findOne({
                where: {id: ingredient}
            })
            
            const categorie = ingredientComplet.tingredient;
            const categorieComplete = await TypeIngredient.findOne( {
                where: {id: categorie}
            })
            if (!ingredientsWithQuantities.hasOwnProperty(categorie)) {
                ingredientsWithQuantities[categorie] = [];
              }

          ingredientsWithQuantities[categorie].push({
            categorie: categorieComplete.nom,
            nom: ingredientComplet.nom,
            quantite: quantite * item.quantite, // Multiplier par la quantité du panier
            uniteQte,
          });
        }
      }
  
      res.json(ingredientsWithQuantities);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Une erreur s\'est produite lors de la récupération des ingrédients du panier.' });
    }
  };
  
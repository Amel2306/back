const TypeRecettes = require("../models/TypeRecette");

exports.getAllTypeRecettes = async (req, res) =>{
    const type_recettes = await TypeRecettes.findAll();
    res.json(type_recettes);
}

exports.getTypeRecette = async (req, res) => {
    const type_recette = await TypeRecettes.findByPk(req.params.id);
    if (type_recette) {
        res.json(type_recette);
    }
    else {
        res.status(404).json( {message: 'type de recette innexistant '})
    }
}

exports.postTypeRecette = async (req, res) => {
    const {nom} = req.body;
    try {
        const newType = await TypeRecettes.create({nom})
        res.status(201).json({message: 'type de recette bien ajouté '})
    } catch( error) {
        res.status(404).json({message: "impossible d'ajouter le type de recette", error})
    }
}

exports.updateTypeRecette = async (req, res) => {
    const {nom} = req.body;
    const typeId = req.params.id
    const raws_up = await TypeRecettes.update({nom}, {where: {id : typeId}})
    try {
        if (raws_up > 0) {
            res.status(200).json({message: "type de recette bien modifié"});
        }
        else {
            res.status(404).json({message: "le type de recette n'a pas été modifié", error});
        }
    } catch (error){
        res.status(400).json({message: "le type de recette n'a pas été trouvé", error});
    }
}

exports.deleteTypeRecette = async (req,res) => {
    const typeId = req.params.id;
    try {
        const raws_del = await TypeRecettes.destroy({where: {id: typeId}})
        if (raw_del > 0) {
            res.status(200).json({message: "type de recette bien supprimé"});
        }
        else {
            res.status(404).json({message: "le type de recette n'a pas été supprimé", error});
        }
    }catch (error) {
        res.status(400).json({message: "le type de recette n'a pas été trouvé", error});

    }

};